import './ProgressIndicator.css';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="progress" aria-label={`Story progress: ${current} of ${total}`}>
      <div className="progress__track">
        <div
          className="progress__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
