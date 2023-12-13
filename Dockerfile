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

# Menggunakan variabel lingkungan untuk menentukan port yang akan diexpose
ARG 8080
ENV PORT 8080
EXPOSE 8080/tcp

# Menjalankan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
