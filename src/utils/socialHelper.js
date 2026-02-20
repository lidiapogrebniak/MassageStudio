const PROFILE_BUILDERS = {
  instagram: (username) =>
    `https://instagram.com/${username}`,

  telegram: (username) =>
    `https://t.me/${username}`,

  viber: (username) =>
    `https://viber.me/${username}`,
};

export function buildProfileLink(platform, username) {
  const builder = PROFILE_BUILDERS[platform];

  if (!builder) {
    console.warn(`Unknown social platform: ${platform}`);
    return '#';
  }

  return builder(username);
}
