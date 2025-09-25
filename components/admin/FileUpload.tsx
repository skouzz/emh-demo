"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, File, ImageIcon, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onFilesChange: (files: File[]) => void
  existingFiles?: string[]
  onRemoveExisting?: (index: number) => void
  label?: string
  description?: string
}

export default function FileUpload({
  accept = "image/*,.pdf,.doc,.docx",
  multiple = true,
  maxSize = 5,
  onFilesChange,
  existingFiles = [],
  onRemoveExisting,
  label = "Fichiers",
  description = "Glissez-déposez vos fichiers ici ou cliquez pour sélectionner",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }, [])

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`Le fichier ${file.name} est trop volumineux (max ${maxSize}MB)`)
        return false
      }
      return true
    })

    const newFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles
    setUploadedFiles(newFiles)
    onFilesChange(newFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    onFilesChange(newFiles)
  }

  const getFileIcon = (file: File | string) => {
    const fileName = typeof file === "string" ? file : file.name
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (["pdf"].includes(extension || "")) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{label}</label>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-emh-red bg-red-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">{description}</p>
          <p className="text-sm text-gray-500">
            {accept.includes("image") && "Images: JPG, PNG, WebP • "}
            {accept.includes("pdf") && "Documents: PDF • "}
            Taille max: {maxSize}MB
          </p>
        </div>
      </div>

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Fichiers existants</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {existingFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.split("/").pop()}</p>
                      <Badge variant="outline" className="text-xs">
                        Existant
                      </Badge>
                    </div>
                  </div>
                  {onRemoveExisting && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveExisting(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Nouveaux fichiers ({uploadedFiles.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
