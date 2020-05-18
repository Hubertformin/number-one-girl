interface HomePageSetting {
  contestantHeader: string;
  bannerImageUrl: any;
  introText: string;
  about: string;
  contactUs: string;
}

interface ContestantsPageSettings {
  description: string;
}

interface RegisterPageSettings {
  heading: any;
  title: any;
  text: string;
}

interface PageSettings {
  home: HomePageSetting;
  contestants: ContestantsPageSettings;
  register: RegisterPageSettings;
}

export interface SettingsModel {
  pageSettings: PageSettings;
}
