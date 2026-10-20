import React, { useState } from 'react';
import { 
  Search, Heart, ArrowRightLeft, Sparkles, Filter, ShieldCheck, 
  ShoppingBag, ExternalLink, ThumbsUp, PlusCircle, CheckCircle2, 
  X, Camera, ChevronRight, User, LogIn, Lock, Mail, Bookmark
} from 'lucide-react';

// Comprehensive dataset including user-requested items like COS Wool Coat
const INITIAL_DUPES = [
  {
    id: 1,
    designer: {
      brand: "COS",
      name: "Oversized Double-Faced Wool Shawl Coat",
      price: 399,
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
      specs: ["100% Double-Faced Wool", "Exaggerated Shawl Lapel", "Oversized Wrap Fit"]
    },
    dupe: {
      brand: "Fibflx",
      name: "Oversized Double-Faced Wool Wrap Coat",
      price: 259,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
      similarityScore: 94,
      highlights: ["100% Wool Blend Construction", "Identical Shawl Lapel Cut", "Over $140 In Savings"],
      affiliateUrl: "https://example.com/buy-cos-coat-dupe"
    },
    category: "Coats & Jackets",
    votes: 412,
    redditSource: "r/femalefashionadvice (Liked by 1,200+ users)"
  },
  {
    id: 2,
    designer: {
      brand: "Skims",
      name: "Soft Lounge Long Sleeve Dress",
      price: 88,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      specs: ["Modal / Spandex", "Floor Length Ribbed", "Bodycon Fit"]
    },
    dupe: {
      brand: "PUMIEY",
      name: "Long Sleeve Crewneck Maxi Dress",
      price: 28,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
      similarityScore: 96,
      highlights: ["Butter-soft modal feel", "Exact silhouette & stretch", "Viral TikTok Alternative"],
      affiliateUrl: "https://example.com/buy-skims-dupe"
    },
    category: "Dresses",
    votes: 842,
    redditSource: "r/HerOneBag"
  },
  {
    id: 3,
    designer: {
      brand: "Aritzia",
      name: "The Effortless Pant",
      price: 148,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      specs: ["Crepe Fabric", "High-Waisted Pleated", "Tailored Wide Leg"]
    },
    dupe: {
      brand: "Abercrombie",
      name: "A&F Sloane Tailored Pant",
      price: 90,
      image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800",
      similarityScore: 91,
      highlights: ["Drape crepe material", "Identical waist pleats", "Multiple inseams"],
      affiliateUrl: "https://example.com/buy-aritzia-dupe"
    },
    category: "Pants",
    votes: 620,
    redditSource: "r/Aritzia"
  }
];

export default function App() {
  const [dupes, setDupes] = useState(INITIAL_DUPES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedItems, setSavedItems] = useState([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authEmail, setAuthEmail] = useState("");

  // Upvote handling
  const handleVote = (id) => {
    setDupes(dupes.map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item));
  };

  // Save style to Closet
  const toggleSaveItem = (item) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (savedItems.some(s => s.id === item.id)) {
      setSavedItems(savedItems.filter(s => s.id !== item.id));
    } else {
      setSavedItems([...savedItems, item]);
    }
  };

  // Handle Login Simulation
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authEmail) {
      setCurrentUser({ email: authEmail, name: authEmail.split('@')[0] });
      setIsAuthModalOpen(false);
    }
  };

  // Live Filter & Search Logic
  const filteredDupes = dupes.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.designer.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dupe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-stone-900 text-white p-2.5 rounded-xl shadow-md">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight">LookALike</span>
              <span className="text-xs uppercase tracking-widest text-amber-600 block -mt-1 font-semibold">Fashion Dupe Engine</span>
            </div>
          </div>

          {/* User Account & Saved Closet Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSavedDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-stone-100 transition flex items-center gap-2 border border-stone-200 text-sm font-medium"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="hidden sm:inline">My Saved Styles</span>
              {savedItems.length > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {savedItems.length}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 border border-stone-200">
                <User className="w-4 h-4 text-amber-600" />
                <span>{currentUser.name}</span>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO & SEARCH SECTION */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 mb-4">
          Find Cheaper Alternatives To Clothing You Love
        </h1>
        <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
          Search luxury brands or specific garments (like <span className="italic font-semibold">COS Shawl Coat</span> or <span className="italic font-semibold">Skims Dress</span>) to reveal crowd-approved alternatives found by the fashion community.
        </p>

        {/* Dynamic Search Bar */}
        <div className="relative max-w-2xl mx-auto shadow-lg rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
          <input 
            type="text"
            placeholder="Search brand, item name (e.g. 'COS coat', 'Aritzia pants')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-13 pr-4 py-4 rounded-2xl border-2 border-stone-300 focus:border-stone-900 bg-white text-lg focus:outline-none transition shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {["All", "Coats & Jackets", "Dresses", "Pants"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === cat 
                  ? 'bg-stone-900 text-white' 
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* DUPES COMPARISON GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDupes.map(item => {
            const savingsPercent = Math.round(((item.designer.price - item.dupe.price) / item.designer.price) * 100);
            const isSaved = savedItems.some(s => s.id === item.id);

            return (
              <div key={item.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {savingsPercent}% Cheaper Alternative
                    </span>
                    <button 
                      onClick={() => toggleSaveItem(item)}
                      className="p-1.5 rounded-full hover:bg-stone-200 transition"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                    </button>
                  </div>

                  {/* Side-By-Side Visual Comparison */}
                  <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 relative">
                    {/* Designer Image */}
                    <div className="relative group">
                      <img src={item.designer.image} alt={item.designer.name} className="w-full h-48 object-cover rounded-l-xl" />
                      <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                        LUXURY
                      </div>
                    </div>
                    {/* Dupe Image */}
                    <div className="relative group">
                      <img src={item.dupe.image} alt={item.dupe.name} className="w-full h-48 object-cover rounded-r-xl" />
                      <div className="absolute top-2 left-2 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                        DUPE
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-4">
                    {/* Price Comparison Row */}
                    <div className="flex items-center justify-between text-sm pb-3 border-b border-stone-100">
                      <div>
                        <p className="text-stone-500 text-xs font-semibold">{item.designer.brand}</p>
                        <p className="line-through text-stone-400 font-bold">${item.designer.price}</p>
                      </div>
                      <ArrowRightLeft className="w-4 h-4 text-stone-300" />
                      <div className="text-right">
                        <p className="text-emerald-700 text-xs font-bold">{item.dupe.brand}</p>
                        <p className="text-xl font-extrabold text-stone-900">${item.dupe.price}</p>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                      {item.designer.name}
                    </h3>

                    {/* Community Source Badge */}
                    {item.redditSource && (
                      <p className="text-xs text-stone-500 italic flex items-center gap-1 bg-stone-50 p-2 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Found via {item.redditSource}
                      </p>
                    )}

                    {/* Highlights */}
                    <ul className="space-y-1.5">
                      {item.dupe.highlights.map((h, idx) => (
                        <li key={idx} className="text-xs text-stone-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 flex items-center justify-between gap-3">
                  <button 
                    onClick={() => handleVote(item.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-2.5 rounded-xl transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-stone-700" />
                    <span>{item.votes}</span>
                  </button>
                  <a 
                    href={item.dupe.affiliateUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Get Deal (${item.dupe.price})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* USER ACCOUNT AUTHENTICATION MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsAuthModalOpen(false)} 
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-stone-800" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Sign In to LookALike</h2>
              <p className="text-xs text-stone-500 mt-1">Save your favourite dupes and sync your wardrobe across devices.</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email" 
                    required 
                    placeholder="you@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-stone-800 transition shadow-md"
              >
                Sign In / Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SAVED STYLES CLOSET DRAWER */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-serif font-bold text-stone-900">Saved Closet</h2>
                </div>
                <button onClick={() => setIsSavedDrawerOpen(false)}>
                  <X className="w-6 h-6 text-stone-400 hover:text-stone-600" />
                </button>
              </div>

              {savedItems.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No saved styles yet. Click the heart icon on any dupe card to add it to your closet!</p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                  {savedItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-stone-200 rounded-2xl bg-stone-50">
                      <img src={item.dupe.image} alt={item.dupe.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-500">{item.dupe.brand}</p>
                        <p className="text-sm font-bold text-stone-900">{item.dupe.name}</p>
                        <p className="text-xs font-bold text-emerald-700">${item.dupe.price} <span className="line-through text-stone-400 font-normal">${item.designer.price}</span></p>
                      </div>
                      <button onClick={() => toggleSaveItem(item)} className="text-stone-400 hover:text-rose-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {savedItems.length > 0 && (
              <div className="pt-4 border-t border-stone-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-stone-600">Total Potential Savings:</span>
                  <span className="text-xl font-extrabold text-emerald-700">
                    ${savedItems.reduce((acc, i) => acc + (i.designer.price - i.dupe.price), 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
