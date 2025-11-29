import { useState } from 'react'
import Tesseract from 'tesseract.js'

export default function InvoiceUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  const onFile = (f: File | null) => {
    setFile(f)
    setText('')
  }

  const runOCR = async () => {
    if (!file) return
    setStatus('Recognizing text...')
    const { data: { text: resultText } } = await Tesseract.recognize(file, 'eng')
    setText(resultText)
    setStatus('Done')
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl">
      <h3 className="font-semibold mb-2">Upload invoice (photo or PDF)</h3>
      <input type="file" accept="image/*,application/pdf" onChange={e => onFile(e.target.files?.[0] || null)} />
      <div className="mt-2 flex space-x-2">
        <button onClick={runOCR} className="px-3 py-1 bg-blue-600 text-white rounded">Run OCR</button>
        <button onClick={async () => {
          if (!file) return
          // upload to /api/upload
          const fd = new FormData()
          fd.append('file', file)
          await fetch('/api/upload', { method: 'POST', body: fd })
          alert('Uploaded (server-side handling stub).')
        }} className="px-3 py-1 bg-green-600 text-white rounded">Upload</button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Status: {status}</p>
        {text && <pre className="mt-3 p-2 bg-gray-100 rounded text-sm">{text}</pre>}
      </div>
    </div>
  )
}
