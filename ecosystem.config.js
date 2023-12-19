/** @format */

module.exports = {
  apps: [
    {
      name: "index", // Nama aplikasi (boleh diganti)
      script: "src/index.js", // Nama file utama aplikasi
      watch: true,
      ignore_watch: ["node_modules", "logs"],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
