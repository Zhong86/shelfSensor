export default function BookCard({ book, onClick }) {
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  //
  return (
    <div className="card card-cozy h-100" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img 
        src={coverUrl} 
        alt={book.title}
        className="book-cover"
        onError={(e) => {
          e.target.src = '/placeholder.jpg'
        }}
      />
      <div className="card-body p-3">
        <h6 className="card-title mb-1 text-truncate">{book.title}</h6>
        <p className="card-text text-muted small mb-2">{book.author}</p>
        <div className="d-flex align-items-center justify-content-between">
          <span className="badge badge-genre">{book.genre}</span>
          <span className="stars small">{'★'.repeat(Math.floor(book.rating))}</span>
        </div>
      </div>
    </div>
  )
}
