# Dockerfile

# Menggunakan image dasar Node.js
FROM node:16

# Menentukan direktori kerja di dalam kontainer
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin semua file aplikasi ke direktori kerja
COPY . .

# Menginstal PM2 secara global
RUN npm install -g pm2

# Copy file konfigurasi PM2 ke dalam kontainer
COPY ecosystem.config.js .

# Menggunakan variabel lingkungan untuk menentukan port yang akan diexpose
ARG PORT
ENV PORT $PORT
EXPOSE $PORT/tcp

# Menjalankan perintah untuk menjalankan aplikasi menggunakan PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
