/**
 * Vite가 빌드 시 주입하는 배포 base 경로 (예: '/', '/portfolio/').
 * vite.config.ts의 `base` 옵션과 항상 동일하게 유지된다.
 */
export const BASE_URL = import.meta.env.BASE_URL;

/**
 * public 폴더 기준 상대경로를 받아 배포 base 경로가 붙은 절대경로를 반환한다.
 * 예: assetPath("image/foo.png") -> "/portfolio/image/foo.png"
 */
export function assetPath(path: string): string {
  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
}
