import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublicKey';
export const IS_REFRESH_TOKEN = 'isRefreshToken';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RefreshToken = () => SetMetadata(IS_REFRESH_TOKEN, true);
