interface HomePageSetting {
  introText: string;
  about: string;
  contactUs: string;
}

interface ContestantsPageSettings {
  description: string;
}

interface RegisterPageSettings {
}

interface PageSettings {
  home: HomePageSetting;
  contestants: ContestantsPageSettings;
  register: RegisterPageSettings;
}

export class SettingsModel {
  pageSettings: PageSettings;
}
