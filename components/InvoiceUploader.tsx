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
    const { data: { text: resultText }} = await Tesseract.recognize(file, 'eng')
    setText(resultText)
    setStatus('Done')
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl">
      <h3 className="font-semibold mb-2">Upload invoice (photo or PDF)</h3>

      <input type="file" accept="image/*,application/pdf"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
      />

      <button className="bg-blue-600 text-white p-2 mt-2"
        onClick={runOCR}>
        Run OCR
      </button>

      {status && <p className="mt-2">{status}</p>}
      {text && (
        <textarea
          className="w-full border mt-3 p-2"
          rows={6}
          value={text}
          readOnly
        />
      )}
    </div>
  )
}
