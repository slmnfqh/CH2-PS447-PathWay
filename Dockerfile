# Dockerfile

# Menggunakan image dasar Node.js
FROM node:16

# Menentukan direktori kerja di dalam kontainer
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install
RUN npx prisma generate
RUN npm install @prisma/client

# Menyalin semua file aplikasi ke direktori kerja
COPY . .

# Menggunakan variabel lingkungan untuk menentukan port yang akan diexpose
ARG PORT
ENV PORT $PORT
EXPOSE $PORT/tcp

# Menjalankan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
