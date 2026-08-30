import { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface UploadControlProps {
  label?: string;
  description?: string;
  value: string | null;
  mediaType?: 'image' | 'lottie' | 'none';
  fileName?: string | null;
  onChange: (url: string | null, type: 'image' | 'lottie' | 'none', fileName?: string | null) => void;
  accept?: string;
  className?: string;
}

const ACCEPTED = '.png,.jpg,.jpeg,.gif,.json,.lottie';

export function UploadControl({
  label,
  description,
  value,
  mediaType = 'none',
  fileName = null,
  onChange,
  accept = ACCEPTED,
  className,
}: UploadControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    const isLottie = /\.(json|lottie)$/i.test(file.name);
    const isImage = /\.(png|jpe?g|gif)$/i.test(file.name);
    if (!isLottie && !isImage) return;
    const url = URL.createObjectURL(file);
    onChange(url, isLottie ? 'lottie' : 'image', file.name);
  };

  const clear = () => onChange(null, 'none', null);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="t-eyebrow">{label}</span>}
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            'flex h-[88px] flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-[var(--text-tertiary)] transition-colors',
            dragOver
              ? 'border-[var(--accent)] bg-[var(--accent-softer)] text-[var(--accent)]'
              : 'border-[var(--border-default)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]',
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v8m0-8l-3 3m3-3l3 3M3.5 12v2.5h11V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12px] font-medium">Click or drag media to upload</span>
          <span className="text-[11px] text-[var(--text-tertiary)]">PNG, JPG, JPEG, GIF, Lottie</span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="sr-only"
            tabIndex={-1}
          />
        </button>
      ) : mediaType === 'image' ? (
        <div className="relative h-[120px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)]">
          <img src={value} alt="Uploaded media" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-[var(--text-secondary)] shadow-[var(--shadow-sm)] backdrop-blur transition-colors hover:text-[var(--danger)]"
            aria-label="Remove media"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex h-[120px] flex-col items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[var(--shadow-xs)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 6.5h8M5 9h8M5 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-medium text-[var(--text-primary)]">Lottie animation uploaded</p>
            <p className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">{fileName || 'Animation preview available in the browser'}</p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="mt-1 inline-flex items-center gap-1 rounded-md border border-[var(--border-default)] bg-white px-3 py-1.5 text-[11.5px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--danger)]"
          >
            Remove media
          </button>
        </div>
      )}
      {description && <span className="text-[11.5px] text-[var(--text-tertiary)]">{description}</span>}
    </div>
  );
}
