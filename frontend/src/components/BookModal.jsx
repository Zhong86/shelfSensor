import { useApp } from '../context/AppContext';

export default function BookModal({ book, onClose }) {
  const { user } = useApp(); 

  if (!book) return null; 
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content modal-cozy">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <img 
                  src={coverUrl} 
                  alt={book.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <p className="text-muted mb-2">by {book.author}</p>
                <div className="mb-3">
                  <span className="badge badge-genre me-2">{book.genre}</span>
                  <span className="stars">{'★'.repeat(Math.floor(book.rating))} {book.rating}</span>
                </div>
                <p className="mb-3">{book.description}</p>
                <p className="small text-muted">ISBN: {book.isbn}</p>

                <h6 className="mt-4 mb-3">Reviews</h6>
                {book.reviews?.map((review, idx) => (
                  <div key={idx} className="border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between">
                      <strong className="small">{review.user}</strong>
                      <span className="stars small">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="small mb-0 text-muted">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {user && (
              <button 
                type="button" 
                className={`btn ${isSaved ? 'btn-outline-cozy' : 'btn-cozy'}`}
                onClick={handleSave}
              >
                {isSaved ? 'Remove from Library' : 'Save to Library'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
