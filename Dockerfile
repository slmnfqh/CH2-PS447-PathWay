# Menggunakan image dasar Node.js
FROM node:16

# Menentukan direktori kerja di dalam kontainer
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menginstal Prisma CLI secara global
RUN npm install -g prisma
RUN npx prisma migrate dev

# Menyalin semua file aplikasi ke direktori kerja
COPY . .

# Menyalin file konfigurasi Prisma
COPY prisma ./prisma

# Menggunakan variabel lingkungan untuk menentukan port yang akan diexpose
ARG PORT
ENV PORT $PORT
EXPOSE $PORT/tcp

# Menjalankan perintah untuk menghasilkan schema Prisma dan menjalankan aplikasi
CMD ["npx", "prisma", "generate", "&&", "npm", "run", "start"]

