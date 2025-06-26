export const getUserIdFromJwt = (token: string): string | null => {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(
      payloadBase64
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    );
    const payload = JSON.parse(payloadJson);
    return payload.user?.id ?? null;
  } catch {
    return null;
  }
}