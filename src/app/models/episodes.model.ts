export interface EpisodesModel {
  id?: string;
  title?: string;
  url?: string;
  description?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  thumbnail?: {
    medium: string;
  }
  viewsCount?: number;
  createdAt?: Date;
}
