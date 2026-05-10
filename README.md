# Couple Questions

Web game dành cho cặp đôi: bốc lá bài bí mật, mở câu hỏi, trả lời trong 2 phút, hỏi lại tối đa 2 lần.

## Chạy local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy GitHub Pages

Repo này đã có workflow `.github/workflows/deploy.yml`.

Sau khi push lên GitHub:

1. Vào repo trên GitHub.
2. Mở **Settings > Pages**.
3. Ở **Build and deployment**, chọn **GitHub Actions**.
4. Push lên branch `main` hoặc chạy workflow thủ công.
5. Mở tab **Actions** để xem trạng thái deploy.
