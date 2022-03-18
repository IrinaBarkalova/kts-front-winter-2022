import ApiStore from "@shared/store/ApiStore";

export default class RootStore {
  readonly apiStore = new ApiStore("https://api.github.com/");
}
