import React from "react";
import {
    Container,
    Title,
    Text,
    Button,
    Paper,
    ThemeIcon,
    SimpleGrid,
    Divider,
    Image,
    Box,
    Center,
    Progress,
    Group,
} from "@mantine/core";
import {
    IconCheck,
    IconRocket,
    IconCodeOff,
    IconSettingsAutomation,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "@/routes/paths";

const features = [
    {
        icon: IconCodeOff,
        title: "No-Code Testing",
        description: "Create and manage tests without writing a single line of code.",
    },
    {
        icon: IconSettingsAutomation,
        title: "Powered by Selenium & Appium",
        description: "Harness industry-standard tools like Selenium, Appium, and more under the hood.",
    },
    {
        icon: IconRocket,
        title: "Test Fast & Scale",
        description: "Run thousands of tests in parallel across browsers and devices.",
    },
    {
        icon: IconCheck,
        title: "CI/CD Friendly",
        description: "Easily integrate with your existing DevOps pipeline for automated test execution.",
    },
    {
        icon: IconCheck,
        title: "Visual Test Flows",
        description: "Drag-and-drop editor lets anyone on your team design smart test flows.",
    },
    {
        icon: IconCheck,
        title: "Flaky Test Detection",
        description: "Smart algorithms detect and isolate flaky tests to improve reliability.",
    },
];

const LandingPage: React.FC = () => {
    return (
        <Box style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(186, 45, 11, 0.25) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
        }}>
            {/* Hero Section */}
            <Container size="lg" py={80}>

                <Title order={1} ta={"center"}>No-Code Testing Made Simple ✨</Title>
                <Text mt="md" size="lg" c="dimmed">
                    Empower your QA teams to build, run, and maintain end-to-end tests using Selenium, Appium, and more — no coding required!
                </Text>
                <Center mt="xl">
                    <Button size="md" component={Link} to={PATH_AUTH.login} color="primary">
                        Try it Free
                    </Button>
                    <Button size="md" variant="outline" color="gray" ml="md">
                        Watch Demo
                    </Button>
                </Center>

            </Container>

            <Divider my="xl" />
            <Container size="lg" py={40}>
                <Title order={2} ta="center" mb="xl">
                    Why Choose Us? 🔥
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                    {features.map((feature) => (
                        <Paper p="md" shadow="sm" key={feature.title} radius="md" style={{
                            backgroundColor: `rgba(0,0,0,0.2)`,
                        }}>
                            <ThemeIcon size="xl" radius="xl" variant="light" color="primary">
                                <feature.icon size={24} />
                            </ThemeIcon>
                            <Title order={4} mt="sm">
                                {feature.title}
                            </Title>
                            <Text mt="xs" size="sm" c="dimmed">
                                {feature.description}
                            </Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            <Divider my="xl" />
            <Center>
                <Paper
                    w={"90%"}
                    py={80}
                    style={{
                        backgroundColor: `rgba(0,0,0,0.2)`,
                    }}
                >
                    <Container size="md">
                        <Title ta="center" order={2}>
                            Start Automating Today 🚀
                        </Title>
                        <Text ta="center" mt="sm" size="lg" c="dimmed">
                            Get up and running in minutes. No scripts, no setup headaches.
                        </Text>
                        <Center mt="xl">
                            <Button
                                size="lg"
                                component={Link}
                                to={PATH_AUTH.login}
                                color="primary"
                            >
                                Start Free Trial
                            </Button>
                        </Center>
                    </Container>
                </Paper>
            </Center>

            <Divider my="xl" />
            <Box py="xl" px="md" style={{ backgroundColor: "#1a1b1e" }}>
                <Container size="lg">
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                        <Box>
                            <Text fw={700} c="whiteBlackTextColor">
                                Company
                            </Text>
                            <Text size="sm" component={Link} to="/about" c="dimmed">
                                About Us
                            </Text>
                            <Text size="sm" component={Link} to="/careers" c="dimmed">
                                Careers
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={700} c="whiteBlackTextColor">
                                Product
                            </Text>
                            <Text size="sm" component={Link} to="/features" c="dimmed">
                                Features
                            </Text>
                            <Text size="sm" component={Link} to="/pricing" c="dimmed">
                                Pricing
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={700} c="whiteBlackTextColor">
                                Support
                            </Text>
                            <Text size="sm" component={Link} to="/help" c="dimmed">
                                Help Center
                            </Text>
                            <Text size="sm" component={Link} to="/contact" c="dimmed">
                                Contact Us
                            </Text>
                        </Box>
                    </SimpleGrid>
                    <Text size="sm" ta="center" mt="xl" c="dimmed">
                        © {new Date().getFullYear()} Ulysse. Built for QA teams everywhere.
                    </Text>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
