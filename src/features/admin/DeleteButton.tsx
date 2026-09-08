"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  url,
  confirmText = "Delete this item?",
}: {
  url: string;
  confirmText?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!confirm(confirmText)) return;

    setDeleting(true);
    setError("");

    const res = await fetch(url, { method: "DELETE" });
    setDeleting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Could not delete.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Delete"
        className="text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>
      {error && <span className="text-destructive text-[11px] mt-1">{error}</span>}
    </div>
  );
}
