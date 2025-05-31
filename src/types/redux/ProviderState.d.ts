import { Provider, ProviderDetails } from "../models/Provider";

interface ProviderState extends BaseState {
    providers: Array<Provider>;
    selectedProvider?: ProviderDetails
}