export const DASH = 'border-dashed border-main/25'
export const DIGITS = Array.from({ length: 5200 }, (_, i) => '0123456789'[(i * 7 + Math.floor(i / 11) * 3) % 10]).join('')
