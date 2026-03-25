import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { api } from '../api.js';
import BookModal from '../components/BookModal';

export default function ScannerPage() {
  const [isbn, setIsbn] = useState('');
  const [scanning, setScanning] = useState(false);
  const [foundBook, setFoundBook] = useState(null);
  const [error, setError] = useState('');
  const scannerRef = useRef(null); 

  useEffect(() => {
    return () => {
      if(scannerRef.current) scannerRef.current.stop().catch(() => {});
    };
  }, []);

  const handleStartScan = async () => {
    setError('')

    if (scanning) {
      await scannerRef.current?.stop();
      scannerRef.current = null;
      setScanning(false); 
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    } catch (err) {
      setError('Camera permission denied. Please allow camera access and try again.');
      return;
    }

    try {
      const html5QrCode = new Html5Qrcode('reader');
      scannerRef.current = html5QrCode;
      setScanning(true);

      await html5QrCode.start(
        { facingMode: 'environment' }, 
        { fps:10, qrbox: { width:250, height:250 } }, 
        async (decodedText) => {
          await html5QrCode.stop();
          scannerRef.current = null;
          setScanning(false);
          setIsbn(decodedText);

          try {
            const book = await api.getBookByIsbn(decodedText);
            setFoundBook(book);
          } catch (error) {
            setError(`No book found for ISBN: ${decodedText}`);
          }
        }, 
        () => {} //ignore frame errors
      );
    } catch (error) {
      setScanning(false); 
      setError('Camera access denied or unavailable');
    }
  };

  const handleManualSearch = async () => {
    if(!isbn) return;
    setError('');

    try {
      const book = await api.getBookByIsbn(isbn);
      setFoundBook(book);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="container">
          <h1 className="h3 mb-4">ISBN Scanner</h1>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card card-cozy">
                <div className="card-body">
                  <h5 className="card-title mb-3">Scan Barcode</h5>

                  <div id="reader" className="mb-3" style={{ width: '100%' }} />

                  {!scanning && (
                    <div className="scanner-preview gap-3 mb-3 text-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <p className="mt-2 mb-0 small">Camera preview</p>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-warning py-2 small mb-3">{error}</div>
                  )}

                  <button
                    className="btn btn-cozy w-100"
                    onClick={handleStartScan}
                  >
                    {scanning ? 'Stop Scanning' : 'Start Scan'}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card card-cozy">
                <div className="card-body">
                  <h5 className="card-title mb-3">Manual Entry</h5>

                  <div className="mb-3">
                    <label className="form-label">ISBN Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter ISBN (e.g., 9780743273565)"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-warning py-2 small">{error}</div>
                  )}

                  <button 
                    className="btn btn-cozy w-100"
                    onClick={handleManualSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {foundBook && (
        <BookModal book={foundBook} 
          onClose={() => setFoundBook(null)} 
        />
      )}
    </>
  )
}
