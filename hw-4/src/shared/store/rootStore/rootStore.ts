import ApiStore from "@shared/store/ApiStore";

export default class RootStore {
  readonly api_store = new ApiStore("https://api.github.com/");
}
