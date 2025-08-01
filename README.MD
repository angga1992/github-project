# GitHub Project Viewer

Aplikasi web untuk melihat dan mengeksplorasi repository GitHub dari user manapun. Dibuat menggunakan React + TypeScript dengan custom CSS.

## Fitur Utama

- **Pencarian User**: Cari username GitHub dan lihat profil lengkapnya
- **List Repository**: Tampilkan semua repository milik user dengan informasi detail
- **README Viewer**: Baca file README dalam format yang rapi dengan markdown support
- **Responsive Design**: Tampilan yang bagus di desktop, tablet, dan mobile
- **Loading States**: Indikator loading yang smooth saat fetch data
- **Error Handling**: Penanganan error yang proper kalau ada masalah

## Teknologi yang Dipakai

- **React 18** - Framework utama
- **TypeScript** - Type safety dan developer experience yang lebih baik
- **Vite** - Build tool yang cepat
- **GitHub API** - Untuk ambil data repository dan user
- **Marked** - Parsing markdown untuk README
- **DOMPurify** - Sanitize HTML untuk keamanan
- **Lucide React** - Icon library

## Cara Menjalankan

1. Clone repository ini
```bash
git clone <repository-url>
cd github-project-viewer
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:5173`

## Cara Pakai

1. **Cari User**: Ketik username GitHub di search box dan tekan enter
2. **Lihat Profile**: Info user akan muncul dengan avatar, bio, dan statistik
3. **Browse Repository**: Scroll ke bawah untuk lihat semua repository
4. **Baca README**: Klik tombol "View README" untuk baca dokumentasi project

## State Management

Pakai React Context API dengan useReducer untuk manage state aplikasi. State yang dikelola:

- User data (profile, stats)
- Repository list
- Selected repository untuk README
- Loading states
- Error messages
- Search query

## Custom CSS

Semua styling dibuat dari scratch tanpa framework CSS. Fitur yang ada:

- **Responsive Grid System**: Layout yang adaptif untuk berbagai ukuran layar
- **Custom Components**: Button, card, input, badge, dll
- **Smooth Animations**: Hover effects dan transitions
- **Typography System**: Hierarchy yang jelas untuk text
- **Color Palette**: Konsisten di seluruh aplikasi
- **Accessibility**: Focus states dan contrast ratio yang baik

## API Rate Limiting

GitHub API punya rate limit 60 requests per jam untuk unauthenticated requests. Kalau kena limit, tunggu sebentar atau pakai personal access token.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

Aplikasi dioptimasi untuk performa dengan:

- Lazy loading untuk README content
- Debounced search
- Efficient re-renders dengan proper state management
- Minimal bundle size

## Kontribusi

Feel free untuk contribute! Bisa buat issue atau pull request kalau ada bug atau ide fitur baru.

## License

MIT License - bebas dipakai untuk project apapun.