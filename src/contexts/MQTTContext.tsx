import React, { useCallback, useEffect, useRef } from "react";
import mqtt, { MqttClient } from 'mqtt';
import { SessionContext } from "./SessionContext";
import useTenant from "@/hooks/useTenant";

type MQTTContextProps = {
    isConnected: boolean;
    MQTTClient: MqttClient | null;
    handleSubscribe: (topic: string, qos: 0 | 1 | 2, callback: (topic: string, message: Buffer) => void) => void;
    handlePublish: (topic: string, payload: string, qos: 0 | 1 | 2) => void;
    handleUnSub: (topic: string, qos?: 0 | 1 | 2) => void;
}

const MQTTContext = React.createContext<Partial<MQTTContextProps>>({
    isConnected: false,
    MQTTClient: null,
    handleSubscribe: () => null,
    handlePublish: () => null,
    handleUnSub: () => null,
});

interface MQTTProviderProps {
    children: React.ReactNode;
}

const MQTTProvider = ({ children }: MQTTProviderProps) => {
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [MQTTClient, setMQTTClient] = React.useState<MqttClient | null>(null);
    const { isAuthenticated } = React.useContext(SessionContext);
    const { tenant } = useTenant();

    const topicCallbacks = useRef<Map<string, (topic: string, message: Buffer) => void>>(new Map());

    const handleConnect = useCallback(() => {
        const host = import.meta.env.VITE_MQTT_HOST;
        const username = import.meta.env.VITE_MQTT_USER;
        const password = import.meta.env.VITE_MQTT_PASSWORD;

        console.log('MQTT Config:', { host, username, password: password ? '[REDACTED]' : undefined })
        const mqttOptions: mqtt.IClientOptions = {
            protocol: 'ws',
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            username: import.meta.env.VITE_MQTT_USER || "admin",
            password: import.meta.env.VITE_MQTT_PASSWORD || "admin123",
            clientId: tenant.id
        };

        const client = mqtt.connect(host, mqttOptions);

        client.on('connect', () => {
            setIsConnected(true);
            setMQTTClient(client);
            console.log('MQTT connection successful');
        });

        client.on('error', (err) => {
            console.error('MQTT Connection error: ', err);
            client.end();
            setIsConnected(false);
            setMQTTClient(null);
        });

        client.on('reconnect', () => {
            console.log('MQTT reconnecting');
            setIsConnected(false);
        });

        client.on('close', () => {
            console.log('MQTT connection closed');
            setIsConnected(false);
            topicCallbacks.current.clear();
        });

        client.on('message', (topic, message) => {
            const callback = topicCallbacks.current.get(topic);
            if (callback) {
                callback(topic, message);
            } else {
                console.warn(`No callback found for topic: ${topic}`);
            }
        });

        return client;
    }, [tenant]);

    const handleSubscribe = useCallback((topic: string, qos: 0 | 1 | 2, callback: (topic: string, message: Buffer) => void) => {
        if (MQTTClient) {
            if (!topicCallbacks.current.has(topic)) {
                MQTTClient.subscribe(topic, { qos }, (error) => {
                    if (error) {
                        console.error('Subscribe to topics error', error);
                        return;
                    }
                    console.log(`Subscribed to topic: ${topic}`);
                    topicCallbacks.current.set(topic, callback);
                });
            } else {
                console.log(`Updating callback for topic: ${topic}`);
                topicCallbacks.current.set(topic, callback);
            }
        }
    }, [MQTTClient]);

    const handlePublish = useCallback((topic: string, payload: string, qos: 0 | 1 | 2) => {
        if (MQTTClient) {
            MQTTClient.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.error('Publish error: ', error);
                }
            });
        }
    }, [MQTTClient]);

    const handleUnSub = useCallback((topic: string, qos: 0 | 1 | 2 = 0) => {
        if (MQTTClient) {
            MQTTClient.unsubscribe(topic, (error) => {
                if (error) {
                    console.error('Unsubscribe error', error);
                    return;
                }
                console.log(`Unsubscribed from topic: ${topic}`);
                topicCallbacks.current.delete(topic);
            });
        }
    }, [MQTTClient]);

    useEffect(() => {
        if (!isAuthenticated) return;
        if (!tenant) return;

        console.log("connection");
        const client = handleConnect();

        return () => {
            if (client) {
                client.end();
                setMQTTClient(null);
                setIsConnected(false);
                topicCallbacks.current.clear();
            }
        };
    }, [isAuthenticated, tenant]);

    return (
        <MQTTContext.Provider value={{ MQTTClient, isConnected, handleSubscribe, handlePublish, handleUnSub }}>
            {children}
        </MQTTContext.Provider>
    );
};

const MQTTConsumer = MQTTContext.Consumer;

export { MQTTContext, MQTTProvider, MQTTConsumer };