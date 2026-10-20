import React, { useState, useEffect } from 'react';
import { 
  Search, Heart, ArrowRightLeft, Sparkles, ShieldCheck, 
  ExternalLink, ThumbsUp, PlusCircle, CheckCircle2, 
  X, User, LogIn, Mail, Bookmark, TrendingUp, SlidersHorizontal, Loader2
} from 'lucide-react';

// Community Database Store (Simulated database with upvote weighting)
const GLOBAL_COMMUNITY_DUPES = [
  {
    id: 'cos-coat-1',
    queryKeywords: ['cos', 'wool', 'shawl', 'coat', 'double-faced', 'oversized'],
    designer: {
      brand: "COS",
      name: "Oversized Double-Faced Wool Shawl Coat",
      price: 399,
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
      specs: "100% Double-Faced Wool, Exaggerated Shawl Lapel, Oversized Wrap Fit"
    },
    dupe: {
      brand: "Fibflx",
      name: "Oversized Double-Faced Wool Wrap Coat",
      price: 259,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
      similarityScore: 94,
      highlights: ["100% Double-Faced Wool Blend", "Identical Shawl Lapel Silhouette", "Community Verified Match"],
      affiliateUrl: "https://google.com/search?q=Fibflx+Oversized+Double-Faced+Wool+Wrap+Coat"
    },
    upvotes: 1240,
    category: "Coats & Jackets"
  },
  {
    id: 'skims-dress-1',
    queryKeywords: ['skims', 'lounge', 'dress', 'soft', 'ribbed', 'maxi'],
    designer: {
      brand: "Skims",
      name: "Soft Lounge Long Sleeve Dress",
      price: 88,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      specs: "Modal/Spandex, Floor-Length Ribbed, Bodycon Fit"
    },
    dupe: {
      brand: "PUMIEY",
      name: "Long Sleeve Crewneck Maxi Dress",
      price: 28,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
      similarityScore: 96,
      highlights: ["Butter-soft modal touch", "Identical bodycon compression", "Viral Community Top Choice"],
      affiliateUrl: "https://google.com/search?q=PUMIEY+Long+Sleeve+Crewneck+Maxi+Dress"
    },
    upvotes: 2150,
    category: "Dresses"
  },
  {
    id: 'aritzia-pant-1',
    queryKeywords: ['aritzia', 'effortless', 'pant', 'trouser', 'pleated'],
    designer: {
      brand: "Aritzia",
      name: "The Effortless Pant",
      price: 148,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      specs: "Japanese Crepe, High-Waisted Pleated, Wide Leg"
    },
    dupe: {
      brand: "Abercrombie & Fitch",
      name: "A&F Sloane Tailored Pant",
      price: 90,
      image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800",
      similarityScore: 92,
      highlights: ["Drape crepe material", "Identical front pleating", "Custom inseams available"],
      affiliateUrl: "https://google.com/search?q=Abercrombie+Sloane+Tailored+Pant"
    },
    upvotes: 980,
    category: "Pants"
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(GLOBAL_COMMUNITY_DUPES);
  const [communityDatabase, setCommunityDatabase] = useState(GLOBAL_COMMUNITY_DUPES);
  const [minSavings, setMinSavings] = useState(0);
  
  // Closet & User Account State
  const [savedItems, setSavedItems] = useState([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authEmail, setAuthEmail] = useState("");

  // Handle Search Engine Lookup & Dynamic Match Generation
  const executeSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(communityDatabase);
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      
      // 1. Filter existing community database
      let matched = communityDatabase.filter(item => {
        const queryTerms = qLower.split(" ");
        return queryTerms.some(term => 
          item.designer.brand.toLowerCase().includes(term) ||
          item.designer.name.toLowerCase().includes(term) ||
          item.dupe.brand.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.queryKeywords.some(k => k.includes(term))
        );
      });

      // 2. Dynamic Search Generator for novel search queries
      if (matched.length === 0) {
        const generatedDupe = {
          id: `dyn-${Date.now()}`,
          queryKeywords: qLower.split(" "),
          designer: {
            brand: query.split(" ")[0].toUpperCase(),
            name: query,
            price: 350,
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
            specs: "High-End Designer Craftsmanship & Cut"
          },
          dupe: {
            brand: "StyleMatch Select",
            name: `Affordable ${query} Alternative`,
            price: 89,
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800",
            similarityScore: 89,
            highlights: ["Identical visual silhouette", "High quality alternative fabric", "Save 74% off designer retail"],
            affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query + ' dupe alternative')}`
          },
          upvotes: 1,
          category: "Search Result"
        };
        matched = [generatedDupe];
      }

      // Sort by community upvotes (Boosted Items Rise to Top)
      matched.sort((a, b) => b.upvotes - a.upvotes);

      setSearchResults(matched);
      setIsSearching(false);
    }, 400);
  };

  // Upvote & Boost System
  const handleUpvote = (itemId) => {
    const updated = communityDatabase.map(item => {
      if (item.id === itemId) {
        return { ...item, upvotes: item.upvotes + 1 };
      }
      return item;
    });

    setCommunityDatabase(updated);

    // Update active search view and re-sort by upvotes
    const reSorted = searchResults.map(item => {
      if (item.id === itemId) {
        return { ...item, upvotes: item.upvotes + 1 };
      }
      return item;
    }).sort((a, b) => b.upvotes - a.upvotes);

    setSearchResults(reSorted);
  };

  // Toggle Save to Closet
  const toggleSaveItem = (item) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (savedItems.some(s => s.id === item.id)) {
      setSavedItems(savedItems.filter(s => s.id !== item.id));
    } else {
      setSavedItems([...savedItems, item]);
      // Saving also boosts item community ranking
      handleUpvote(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans">
      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSearchQuery(""); setSearchResults(communityDatabase); }}>
            <div className="bg-stone-900 text-white p-2.5 rounded-xl shadow-md">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight">LookALike</span>
              <span className="text-xs uppercase tracking-widest text-amber-600 block -mt-1 font-semibold">Fashion Search Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSavedDrawerOpen(true)}
              className="p-2.5 rounded-full hover:bg-stone-100 transition flex items-center gap-2 border border-stone-200 text-sm font-medium"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="hidden sm:inline">Saved Closet</span>
              {savedItems.length > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {savedItems.length}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-stone-100 px-3.5 py-2 rounded-full text-xs font-semibold text-stone-800 border border-stone-200">
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

      {/* SEARCH ENGINE HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 mb-3">
          Search Any Clothing Item For Cheaper Alternatives
        </h1>
        <p className="text-stone-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Type any brand or outfit (e.g. <span className="font-semibold italic text-stone-800">"COS wool coat"</span>, <span className="font-semibold italic text-stone-800">"Skims dress"</span>, <span className="font-semibold italic text-stone-800">"Aritzia pants"</span>). Our community engine finds and ranks the best budget matches.
        </p>

        {/* Universal Search Input */}
        <div className="relative max-w-2xl mx-auto shadow-xl rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
          <input 
            type="text"
            placeholder="Paste clothing link, brand name, or style..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              executeSearch(e.target.value);
            }}
            className="w-full pl-13 pr-24 py-4 rounded-2xl border-2 border-stone-300 focus:border-stone-900 bg-white text-base sm:text-lg focus:outline-none transition"
          />
          {searchQuery ? (
            <button 
              onClick={() => { setSearchQuery(""); setSearchResults(communityDatabase); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">
              Live Engine
            </span>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-stone-500">
          <span>Popular:</span>
          {["COS Wool Coat", "Skims Dress", "Aritzia Pants"].map(chip => (
            <button
              key={chip}
              onClick={() => {
                setSearchQuery(chip);
                executeSearch(chip);
              }}
              className="bg-white border border-stone-200 px-3 py-1 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition"
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH RESULTS & COMPARISON FEED */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isSearching ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-stone-800 mb-3" />
            <p className="text-sm font-semibold text-stone-600">Searching web & community ratings for "{searchQuery}"...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map(item => {
              const savingsAmount = item.designer.price - item.dupe.price;
              const savingsPercent = Math.round((savingsAmount / item.designer.price) * 100);
              const isSaved = savedItems.some(s => s.id === item.id);

              return (
                <div key={item.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    {/* Header Badge & Save Button */}
                    <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {savingsPercent}% Savings (Save ${savingsAmount})
                      </span>
                      <button 
                        onClick={() => toggleSaveItem(item)}
                        className="p-1.5 rounded-full hover:bg-stone-200 transition"
                      >
                        <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                      </button>
                    </div>

                    {/* Side-By-Side Visual Match */}
                    <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 relative">
                      <div className="relative">
                        <img src={item.designer.image} alt={item.designer.name} className="w-full h-48 object-cover rounded-l-xl" />
                        <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                          LUXURY
                        </div>
                      </div>
                      <div className="relative">
                        <img src={item.dupe.image} alt={item.dupe.name} className="w-full h-48 object-cover rounded-r-xl" />
                        <div className="absolute top-2 left-2 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                          BEST ALTERNATIVE
                        </div>
                      </div>
                    </div>

                    {/* Product Specs */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-sm pb-2 border-b border-stone-100">
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

                      <ul className="space-y-1 pt-1">
                        {item.dupe.highlights.map((h, idx) => (
                          <li key={idx} className="text-xs text-stone-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Upvote & Buy Actions */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-3">
                    <button 
                      onClick={() => handleUpvote(item.id)}
                      title="Upvoting boosts this alternative for future searchers"
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-amber-100 hover:text-amber-900 px-3 py-2.5 rounded-xl transition border border-stone-200"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-stone-700" />
                      <span>{item.upvotes} Boosts</span>
                    </button>
                    <a 
                      href={item.dupe.affiliateUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <span>Buy Alternative (${item.dupe.price})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
              <h2 className="text-2xl font-serif font-bold text-stone-900">Sign In to LookALike</h2>
              <p className="text-xs text-stone-500 mt-1">Save styles to your closet & boost top dupe recommendations.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (authEmail) {
                setCurrentUser({ email: authEmail, name: authEmail.split('@')[0] });
                setIsAuthModalOpen(false);
              }
            }} className="space-y-4">
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
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SAVED CLOSET DRAWER */}
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
                  <p className="text-sm">No saved items yet. Click the heart icon on any card to save it here.</p>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-stone-600">Total Saved:</span>
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
