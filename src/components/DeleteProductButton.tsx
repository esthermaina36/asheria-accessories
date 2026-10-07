"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
  imageUrl?: string | null;
};

export default function DeleteProductButton({
  productId,
  productName,
  imageUrl,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?\n\nThis will also delete its product image. This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    const supabase = createClient();

    // Delete the product image from Supabase Storage
    if (imageUrl) {
      const marker = "/storage/v1/object/public/Products/";

      if (imageUrl.includes(marker)) {
        const imagePath = imageUrl.split(marker)[1];

        const { error: imageDeleteError } = await supabase.storage
          .from("Products")
          .remove([imagePath]);

        if (imageDeleteError) {
          setError(
            `The product image could not be deleted: ${imageDeleteError.message}`,
          );
          setDeleting(false);
          return;
        }
      }
    }

    // Delete the product from the database
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="mt-2 max-w-xs text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}