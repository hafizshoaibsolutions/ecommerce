"use client"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
const ImageUploader = forwardRef(({ onImagesChange, onNewImagesAdded, maxFiles = 6, maxSizeMB = 5 }, ref) => {
    const maxSize = maxSizeMB * 1024 * 1024

    const [
      { files, isDragging, errors },
      {
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        openFileDialog,
        removeFile,
        clearFiles,
        getInputProps,
      },
    ] = useFileUpload({
      accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
      maxSize,
      multiple: true,
      maxFiles,
      onFilesChange: onImagesChange, // Called whenever files change (add/remove/clear)
      onFilesAdded: onNewImagesAdded, // Called only when new files are added
    })

    useImperativeHandle(ref, () => ({
      clearFiles,
    }))

    return (
      <div className="flex flex-col gap-2">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors"
        >
          <input {...getInputProps()} className="sr-only" aria-label="Upload image files" />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" />
              Select images
            </Button>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-accent aspect-square shrink-0 rounded">
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.file.name}
                      className="size-10 rounded-[inherit] object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="truncate text-[13px] font-medium">{file.file.name}</p>
                    <p className="text-muted-foreground text-xs">{file.file.size} bytes</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground/80 hover:text-foreground -me-2 size-8"
                  onClick={() => removeFile(file.id)}
                >
                  <XIcon />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)

ImageUploader.displayName = "ImageUploader"

export default ImageUploader


