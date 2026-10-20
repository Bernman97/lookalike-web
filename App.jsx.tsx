import React, { useState, useMemo } from 'react';
import { 
  Search, Heart, Plus, Sparkles, Filter, Calculator, 
  ArrowUpRight, CheckCircle, ThumbsUp, ThumbsDown, SlidersHorizontal, 
  ShoppingBag, Tag, Star, ChevronRight, X, ExternalLink, Image as ImageIcon,
  Share2, ShieldCheck, Zap, ArrowRight, Check
} from 'lucide-react';

// Pre-populated curated fashion database for LookALike
const INITIAL_ITEMS = [
  {
    id: '1',
    designer: {
      name: 'Fits Everybody Long Sleeve Bodysuit',
      brand: 'SKIMS',
      price: 58,
      category: 'Dresses & Tops',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      fabric: '76% Polyamide, 24% Elastane',
      vibe: 'Second-skin snatching, buttery stretch, seamless finish',
      link: 'https://skims.com'
    },
    dupes: [
      {
        id: 'd1-1',
        name: 'Seamless Crewneck Long Sleeve Bodysuit',
        brand: 'PUMIEY (Amazon)',
        price: 23,
        rating: 4.8,
        reviewsCount: 1420,
        similarityScore: 98,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
        highlights: 'Viral double-layered compression fabric, identical buttery feel and curve shaping',
        link: 'https://amazon.com',
        upvotes: 428,
        downvotes: 12
      },
      {
        id: 'd1-2',
        name: 'Contour Longsleeve Bodysuit',
        brand: 'Aritzia Babaton',
        price: 48,
        rating: 4.6,
        reviewsCount: 890,
        similarityScore: 91,
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
        highlights: 'Thicker double-layered Everyday Contour fabric with high-cut thong snap closure',
        link: 'https://aritzia.com',
        upvotes: 210,
        downvotes: 18
      }
    ]
  },
  {
    id: '2',
    designer: {
      name: 'Small Jodie Leather Hobo Bag',
      brand: 'Bottega Veneta',
      price: 3500,
      category: 'Handbags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
      fabric: '100% Lambskin Intrecciato Weave',
      vibe: 'Iconic side knot, artisan braided weave structure, soft slouchy shape',
      link: 'https://bottegaveneta.com'
    },
    dupes: [
      {
        id: 'd2-1',
        name: 'Woven Knot Top Handle Hobo Bag',
        brand: 'Anthropologie',
        price: 98,
        rating: 4.8,
        reviewsCount: 640,
        similarityScore: 95,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
        highlights: 'Supple vegan leather with identical oversized knot handle and woven pattern',
        link: 'https://anthropologie.com',
        upvotes: 1205,
        downvotes: 34
      },
      {
        id: 'd2-2',
        name: 'Pebbled Woven Shoulder Bag',
        brand: 'JW PEI',
        price: 89,
        rating: 4.6,
        reviewsCount: 420,
        similarityScore: 90,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
        highlights: 'Ultra lightweight polyurethane woven construction with secure top zip',
        link: 'https://jwpei.com',
        upvotes: 380,
        downvotes: 21
      }
    ]
  },
  {
    id: '3',
    designer: {
      name: 'Super-Star Distressed Leather Sneakers',
      brand: 'Golden Goose',
      price: 565,
      category: 'Shoes',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
      fabric: '100% Cowhide Leather & Rubber Sole',
      vibe: 'Pre-distressed vintage streetwear look, suede star patch detail',
      link: 'https://goldengoose.com'
    },
    dupes: [
      {
        id: 'd3-1',
        name: 'Gadget Distressed Metallic Star Sneaker',
        brand: 'Vintage Havana',
        price: 75,
        rating: 4.7,
        reviewsCount: 980,
        similarityScore: 93,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
        highlights: 'Signature side star patch, slip-on styling with subtle hand-distressed rubber',
        link: 'https://vintagehavana.com',
        upvotes: 620,
        downvotes: 15
      }
    ]
  },
  {
    id: '4',
    designer: {
      name: 'Effortless High-Waisted Wide Leg Pant',
      brand: 'Aritzia',
      price: 148,
      category: 'Dresses & Tops',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      fabric: 'Japanese Crepe (100% Polyester)',
      vibe: 'Tailored front pleats, fluid drape, wrinkle-resistant architectural tailoring',
      link: 'https://aritzia.com'
    },
    dupes: [
      {
        id: 'd4-1',
        name: 'Wide Leg Pleated Trousers',
        brand: 'UNIQLO',
        price: 49,
        rating: 4.9,
        reviewsCount: 2200,
        similarityScore: 94,
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800',
        highlights: 'Two-way stretch crepe fabric with clean darting and relaxed wide-leg fall',
        link: 'https://uniqlo.com',
        upvotes: 840,
        downvotes: 28
      }
    ]
  },
  {
    id: '5',
    designer: {
      name: 'Fringe Alpaca & Mohair Scarf',
      brand: 'Acne Studios',
      price: 320,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
      fabric: '33% Alpaca, 25% Wool, 22% Nylon, 20% Mohair',
      vibe: 'Oversized pastel plaid knit, fluffy brushed texture, chunky fringe',
      link: 'https://acnestudios.com'
    },
    dupes: [
      {
        id: 'd5-1',
        name: 'Plush Checked Tassel Blanket Scarf',
        brand: 'Mango',
        price: 49,
        rating: 4.8,
        reviewsCount: 430,
        similarityScore: 96,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
        highlights: 'Ultra-soft tactile brushed check knit with oversized tassel ends',
        link: 'https://mango.com',
        upvotes: 490,
        downvotes: 8
      }
    ]
  }
];

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under50', 'under100'
  const [minSavings, setMinSavings] = useState(0); // 0, 50, 75
  const [sortBy, setSortBy] = useState('match'); // 'match', 'savings', 'price-low'
  
  const [wishlist, setWishlist] = useState([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [photoSearchActive, setPhotoSearchActive] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  
  // Track votes on dupes locally
  const [userVotes, setUserVotes] = useState({});

  // New Dupe Form State
  const [newDupe, setNewDupe] = useState({
    designerBrand: '', designerName: '', designerPrice: '', category: 'Dresses & Tops',
    designerImage: '', dupeBrand: '', dupeName: '', dupePrice: '', dupeImage: '',
    highlights: '', link: ''
  });

  const calcSavingsPct = (designerPrice, dupePrice) => {
    if (!designerPrice || !dupePrice) return 0;
    return Math.round(((designerPrice - dupePrice) / designerPrice) * 100);
  };

  const toggleWishlist = (dupe, designer) => {
    const exists = wishlist.some(item => item.dupe.id === dupe.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.dupe.id !== dupe.id));
    } else {
      setWishlist([...wishlist, { dupe, designer }]);
    }
  };

  const handleVote = (dupeId, voteType) => {
    if (userVotes[dupeId] === voteType) return;

    setUserVotes(prev => ({ ...prev, [dupeId]: voteType }));

    setItems(prevItems => 
      prevItems.map(item => ({
        ...item,
        dupes: item.dupes.map(d => {
          if (d.id !== dupeId) return d;
          const currentVote = userVotes[dupeId];
          let upDelta = voteType === 'up' ? 1 : (currentVote === 'up' ? -1 : 0);
          let downDelta = voteType === 'down' ? 1 : (currentVote === 'down' ? -1 : 0);

          return {
            ...d,
            upvotes: d.upvotes + upDelta,
            downvotes: d.downvotes + downDelta
          };
        })
      }))
    );
  };

  const handleAddDupeSubmit = (e) => {
    e.preventDefault();
    if (!newDupe.designerName || !newDupe.dupeName || !newDupe.dupePrice) return;

    const dPrice = parseFloat(newDupe.designerPrice) || 200;
    const duPrice = parseFloat(newDupe.dupePrice) || 40;

    const newItem = {
      id: Date.now().toString(),
      designer: {
        name: newDupe.designerName,
        brand: newDupe.designerBrand || 'Luxury Brand',
        price: dPrice,
        category: newDupe.category,
        image: newDupe.designerImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
        fabric: 'High quality luxury blend',
        vibe: 'Trending designer silhouette',
        link: '#'
      },
      dupes: [
        {
          id: `d-${Date.now()}`,
          name: newDupe.dupeName,
          brand: newDupe.dupeBrand || 'Affordable Retailer',
          price: duPrice,
          rating: 4.9,
          reviewsCount: 1,
          similarityScore: 95,
          image: newDupe.dupeImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
          highlights: newDupe.highlights || 'Community submitted alternative with near-identical drape and feel!',
          link: newDupe.link || 'https://google.com',
          upvotes: 1,
          downvotes: 0
        }
      ]
    };

    setItems([newItem, ...items]);
    setIsSubmitModalOpen(false);
    setNewDupe({
      designerBrand: '', designerName: '', designerPrice: '', category: 'Dresses & Tops',
      designerImage: '', dupeBrand: '', dupeName: '', dupePrice: '', dupeImage: '', highlights: '', link: ''
    });
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.designer.category !== selectedCategory) {
        return false;
      }
      
      // Search query
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.designer.name.toLowerCase().includes(q) ||
        item.designer.brand.toLowerCase().includes(q) ||
        item.dupes.some(d => d.name.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Price filter
      if (priceFilter === 'under50') {
        const hasUnder50 = item.dupes.some(d => d.price <= 50);
        if (!hasUnder50) return false;
      } else if (priceFilter === 'under100') {
        const hasUnder100 = item.dupes.some(d => d.price <= 100);
        if (!hasUnder100) return false;
      }

      // Min savings filter
      const maxSavingsInItem = Math.max(
        ...item.dupes.map(d => calcSavingsPct(item.designer.price, d.price))
      );
      if (maxSavingsInItem < minSavings) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') {
        const topMatchA = Math.max(...a.dupes.map(d => d.similarityScore));
        const topMatchB = Math.max(...b.dupes.map(d => d.similarityScore));
        return topMatchB - topMatchA;
      }
      if (sortBy === 'savings') {
        const maxSaveA = Math.max(...a.dupes.map(d => calcSavingsPct(a.designer.price, d.price)));
        const maxSaveB = Math.max(...b.dupes.map(d => calcSavingsPct(b.designer.price, d.price)));
        return maxSaveB - maxSaveA;
      }
      if (sortBy === 'price-low') {
        const minDupeA = Math.min(...a.dupes.map(d => d.price));
        const minDupeB = Math.min(...b.dupes.map(d => d.price));
        return minDupeA - minDupeB;
      }
      return 0;
    });
  }, [items, searchQuery, selectedCategory, priceFilter, minSavings, sortBy]);

  const totalWishlistDesignerCost = wishlist.reduce((acc, curr) => acc + curr.designer.price, 0);
  const totalWishlistDupeCost = wishlist.reduce((acc, curr) => acc + curr.dupe.price, 0);
  const totalWishlistSaved = totalWishlistDesignerCost - totalWishlistDupeCost;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased selection:bg-[#E5D2B8] selection:text-[#1A1A1A]">
      
      {/* --- TOP BRAND BANNER --- */}
      <div className="bg-[#1A1A1A] text-[#E5D2B8] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>LookALike • High Fashion Looks, Smart Budget Pricing • Save Up to 95%</span>
      </div>

      {/* --- NAVIGATION HEADER --- */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
          >
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center font-serif text-xl font-bold tracking-tighter shadow-md">
              LK
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] block leading-none">
                Look<span className="italic font-normal text-[#B8860B]">ALike</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#7A756C] uppercase font-semibold">Luxury Dupe Finder</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Calculator Trigger */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D5CFC5] bg-white hover:bg-[#F2EDE4] text-xs font-semibold text-[#1A1A1A] transition shadow-2xs"
            >
              <Calculator className="w-4 h-4 text-[#B8860B]" />
              <span className="hidden sm:inline">Outfit Savings</span>
              <span className="bg-[#1A1A1A] text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                ${totalWishlistSaved > 0 ? totalWishlistSaved : 0}
              </span>
            </button>

            {/* Submit Dupe Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold transition shadow-md"
            >
              <Plus className="w-4 h-4 text-[#E5D2B8]" />
              <span className="hidden sm:inline">Submit Dupe</span>
            </button>

            {/* Wishlist Button */}
            <div className="relative">
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#EAE4DC] text-[#1A1A1A] transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5E0D8] bg-gradient-to-b from-[#F3EFEA] to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE3D9] text-[#5A5245] text-xs font-medium tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#B8860B]" /> Verified Fabric & Cut Comparisons
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A1A] font-bold tracking-tight leading-tight">
            Find High-End Fashion. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#B8860B]">For a Fraction of the Price.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5A554C] max-w-2xl mx-auto font-light leading-relaxed">
            Stop overpaying for luxury brand logos. Discover community-voted, 90%+ matching dupes for SKIMS, Lululemon, Bottega Veneta, Acne Studios, and more.
          </p>

          {/* Instant Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-[#DCD5CB] p-2 focus-within:ring-2 focus-within:ring-[#B8860B] transition-all">
              
              <Search className="w-5 h-5 text-[#8C857B] ml-3" />
              <input
                type="text"
                placeholder="Search Skims bodysuit, Bottega bag, Acne scarf..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-4 py-3 bg-transparent text-sm sm:text-base text-[#1A1A1A] placeholder-[#8C857B] focus:outline-none"
              />

              <button
                onClick={() => setPhotoSearchActive(!photoSearchActive)}
                className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
                  photoSearchActive 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-[#FAF8F5] text-[#5A5245] hover:bg-[#EAE4DC] border-[#D5CFC5]'
                }`}
                title="Find dupe by image URL"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Visual Search</span>
              </button>

            </div>

            {/* Photo Search Simulator Drawer */}
            {photoSearchActive && (
              <div className="mt-3 p-4 bg-white rounded-xl border border-[#D5CFC5] text-left shadow-sm animate-fadeIn">
                <label className="block text-xs font-semibold text-[#5A554C] mb-1">
                  Paste Fashion Image URL to Find Match:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-[#D5CFC5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                  />
                  <button 
                    onClick={() => {
                      if (photoUrlInput) {
                        setSearchQuery('Bodysuit'); // Trigger search filter simulation
                        setPhotoSearchActive(false);
                      }
                    }}
                    className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-semibold rounded-lg hover:bg-[#333]"
                  >
                    Analyze Image
                  </button>
                </div>
                <p className="text-[11px] text-[#8C857B] mt-1.5">
                  Our visual similarity engine scans color palette, silhouette structure, and weave texture.
                </p>
              </div>
            )}

            {/* Popular Dupe Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#7A756C]">
              <span className="font-medium text-[#1A1A1A]">Trending dupes:</span>
              {['#SKIMS', '#Bottega', '#Aritzia', '#GoldenGoose', '#AcneStudios'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                  className="px-2.5 py-1 bg-white hover:bg-[#EAE4DC] border border-[#E0D9CE] rounded-full transition shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* --- FILTER & SORT TOOLBAR --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Dresses & Tops', 'Handbags', 'Shoes', 'Accessories'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white hover:bg-[#EAE4DC] text-[#5A554C] border border-[#E0D9CE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Price Cap Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E0D9CE] rounded-full px-3 py-1.5 text-xs text-[#5A554C]">
              <span>Max Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-transparent font-semibold text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="all">Any Price</option>
                <option value="under50">Under $50</option>
                <option value="under100">Under $100</option>
              </select>
            </div>

            {/* Savings Threshold */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E0D9CE] rounded-full px-3 py-1.5 text-xs text-[#5A554C]">
              <Tag className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Min Savings:</span>
              <select
                value={minSavings}
                onChange={(e) => setMinSavings(Number(e.target.value))}
                className="bg-transparent font-semibold text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value={0}>Any Savings</option>
                <option value={50}>50%+ Off</option>
                <option value={75}>75%+ Off</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E0D9CE] rounded-full px-3 py-1.5 text-xs text-[#5A554C]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="match">Highest Match %</option>
                <option value="savings">Biggest Savings $</option>
                <option value="price-low">Cheapest First</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Info */}
        <div className="pt-4 flex items-center justify-between text-xs text-[#7A756C]">
          <span>
            Showing <strong className="text-[#1A1A1A] font-semibold">{filteredItems.length}</strong> designer items with verified LookALike dupes
          </span>
          {(searchQuery || selectedCategory !== 'All' || priceFilter !== 'all' || minSavings > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceFilter('all');
                setMinSavings(0);
              }}
              className="text-[#B8860B] font-semibold hover:underline flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* --- MAIN DUPE COMPARISON FEED --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E5E0D8] p-8 max-w-md mx-auto my-8">
            <ShoppingBag className="w-12 h-12 text-[#B8860B] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">No dupes found</h3>
            <p className="text-xs text-[#7A756C] mt-2 mb-6">
              We couldn't find matches for your active filters. Try searching another item or submit a new dupe!
            </p>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-full hover:bg-[#333]"
            >
              Submit a Dupe for this item
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xs hover:shadow-md transition-shadow overflow-hidden p-6 sm:p-8"
              >
                {/* Item Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-[#F0ECE6]">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] bg-[#FAF5EB] px-2.5 py-1 rounded-full border border-[#EADCB9]">
                      {item.designer.category}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-2">
                      {item.designer.brand} — {item.designer.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7A756C] block">Original Retail Price</span>
                    <span className="text-lg font-serif font-bold text-[#1A1A1A]">${item.designer.price}</span>
                  </div>
                </div>

                {/* Side-by-Side Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
                  
                  {/* DESIGNER SPLURGE (4 Columns) */}
                  <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-5 border border-[#EAE4DC] flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#EAE4DC] mb-4">
                        <img 
                          src={item.designer.image} 
                          alt={item.designer.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-[#1A1A1A]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Designer Splurge
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-bold text-[#7A756C] uppercase tracking-wider">{item.designer.brand}</span>
                          <span className="text-base font-serif font-bold text-[#1A1A1A]">${item.designer.price}</span>
                        </div>
                        <p className="text-sm font-semibold text-[#1A1A1A] line-clamp-1">{item.designer.name}</p>
                        
                        <div className="pt-2 text-xs space-y-1.5 text-[#5A554C]">
                          <p><strong className="text-[#1A1A1A]">Fabric:</strong> {item.designer.fabric}</p>
                          <p><strong className="text-[#1A1A1A]">Cut & Fit:</strong> {item.designer.vibe}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E5E0D8] text-[11px] text-[#8C857B] italic">
                      High-end luxury baseline for comparison
                    </div>
                  </div>

                  {/* LOOKALIKE DUPES (8 Columns) */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#B8860B]" /> LookALike Verified Alternatives ({item.dupes.length})
                      </span>
                      <span className="text-xs text-[#7A756C]">Verified similarity score</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      {item.dupes.map((dupe) => {
                        const savingsPct = calcSavingsPct(item.designer.price, dupe.price);
                        const isWishlisted = wishlist.some(w => w.dupe.id === dupe.id);
                        const userVote = userVotes[dupe.id];

                        return (
                          <div 
                            key={dupe.id}
                            className="bg-white rounded-2xl border border-[#E5E0D8] hover:border-[#D5CFC5] p-4 flex flex-col justify-between shadow-2xs relative group transition-all"
                          >
                            {/* Badges Overlay */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="bg-[#125B32] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                                Save {savingsPct}% (${item.designer.price - dupe.price})
                              </span>

                              <div className="flex items-center gap-1 bg-[#FAF5EB] border border-[#EADCB9] text-[#B8860B] px-2 py-0.5 rounded-full text-[11px] font-bold">
                                <Sparkles className="w-3 h-3" />
                                {dupe.similarityScore}% Match
                              </div>
                            </div>

                            {/* Dupe Image & Info */}
                            <div className="flex gap-3 mb-3">
                              <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#EAE4DC] flex-shrink-0">
                                <img 
                                  src={dupe.image} 
                                  alt={dupe.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-bold text-[#B8860B] uppercase">{dupe.brand}</span>
                                <h3 className="text-xs font-bold text-[#1A1A1A] truncate">{dupe.name}</h3>
                                <div className="text-base font-serif font-bold text-[#1A1A1A] mt-1">
                                  ${dupe.price}
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-[#7A756C] mt-1">
                                  <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                                  <span className="font-semibold text-[#1A1A1A]">{dupe.rating}</span>
                                  <span>({dupe.reviewsCount})</span>
                                </div>
                              </div>
                            </div>

                            {/* Fabric / Why it dupes */}
                            <div className="bg-[#FAF8F5] rounded-xl p-2.5 mb-3 text-xs text-[#5A554C] border border-[#F0ECE6]">
                              <strong className="text-[#1A1A1A] block text-[10px] uppercase font-bold tracking-wider mb-0.5">Why it dupes:</strong>
                              <p className="leading-snug text-[11px]">{dupe.highlights}</p>
                            </div>

                            {/* Accuracy Voting & Direct Buy */}
                            <div className="pt-2 border-t border-[#F0ECE6] flex items-center justify-between gap-2">
                              
                              {/* Community Vote */}
                              <div className="flex items-center gap-1 bg-[#FAF8F5] rounded-full px-2 py-1 border border-[#EAE4DC]">
                                <span className="text-[10px] text-[#7A756C] font-medium mr-1">Accurate?</span>
                                <button
                                  onClick={() => handleVote(dupe.id, 'up')}
                                  className={`p-1 rounded-full transition ${userVote === 'up' ? 'text-[#125B32] font-bold' : 'text-[#8C857B] hover:text-[#1A1A1A]'}`}
                                  title="Vote Accurate Match"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <span className="text-[10px] font-mono text-[#5A554C]">{dupe.upvotes}</span>

                                <button
                                  onClick={() => handleVote(dupe.id, 'down')}
                                  className={`p-1 rounded-full transition ${userVote === 'down' ? 'text-[#B91C1C] font-bold' : 'text-[#8C857B] hover:text-[#1A1A1A]'}`}
                                  title="Vote Inaccurate"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Wishlist & Shop */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleWishlist(dupe, item.designer)}
                                  className={`p-2 rounded-full border transition ${
                                    isWishlisted 
                                      ? 'bg-[#B8860B] text-white border-[#B8860B]' 
                                      : 'bg-white border-[#D5CFC5] text-[#5A554C] hover:bg-[#FAF8F5]'
                                  }`}
                                  title="Save to Wishlist"
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
                                </button>

                                <a
                                  href={dupe.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold transition"
                                >
                                  <span>Buy Dupe</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* --- OUTFIT SAVINGS CALCULATOR / WISHLIST DRAWER --- */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E0D8]">
            
            {/* Header */}
            <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#B8860B]" />
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">LookALike Wishlist</h3>
              </div>
              <button 
                onClick={() => setIsCalculatorOpen(false)}
                className="p-2 rounded-full hover:bg-[#EAE4DC] text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Saved Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-[#7A756C]">
                  <Heart className="w-10 h-10 mx-auto mb-2 text-[#D5CFC5]" />
                  <p className="text-sm font-medium">Your saved wishlist is empty.</p>
                  <p className="text-xs text-[#8C857B] mt-1">Click the heart icon on any dupe to calculate your total savings!</p>
                </div>
              ) : (
                wishlist.map(({ dupe, designer }) => (
                  <div key={dupe.id} className="bg-white p-4 rounded-2xl border border-[#E5E0D8] flex items-center justify-between gap-3 shadow-2xs">
                    <img src={dupe.image} alt={dupe.name} className="w-14 h-16 object-cover rounded-lg bg-[#EAE4DC]" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{dupe.name}</h4>
                      <p className="text-[11px] text-[#7A756C]">Replaces: {designer.brand} ({designer.name})</p>
                      
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="font-bold text-[#125B32]">${dupe.price}</span>
                        <span className="line-through text-[#8C857B]">${designer.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(dupe, designer)}
                      className="text-[#8C857B] hover:text-[#B91C1C] p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total Savings Breakdown */}
            <div className="p-6 border-t border-[#E5E0D8] bg-white space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#5A554C]">
                  <span>Total Designer Retail Cost:</span>
                  <span className="font-mono text-[#1A1A1A] font-semibold">${totalWishlistDesignerCost}</span>
                </div>
                <div className="flex justify-between text-[#5A554C]">
                  <span>Total LookALike Cost:</span>
                  <span className="font-mono text-[#125B32] font-semibold">${totalWishlistDupeCost}</span>
                </div>
                <div className="pt-2 border-t border-[#F0ECE6] flex justify-between text-sm font-bold text-[#1A1A1A]">
                  <span>Your Saved Amount:</span>
                  <span className="font-mono text-[#B8860B] text-base">${totalWishlistSaved}</span>
                </div>
              </div>

              <button 
                onClick={() => alert(`Saved outfit list compiled! You saved $${totalWishlistSaved} total.`)}
                disabled={wishlist.length === 0}
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-bold rounded-full transition disabled:opacity-50"
              >
                Export Saved Outfit List
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- SUBMIT A DUPE MODAL --- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-3xl border border-[#E5E0D8] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-[#E5E0D8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#B8860B]" />
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Submit a Dupe</h3>
              </div>
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE4DC] text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddDupeSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              <div className="bg-[#FAF5EB] p-3 rounded-xl border border-[#EADCB9] text-[#7A5A0B] text-[11px]">
                Spotted a high-end alternative? Share it with the LookALike fashion community!
              </div>

              {/* Designer Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">1. High-Fashion Luxury Item</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Designer Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Miu Miu"
                      value={newDupe.designerBrand}
                      onChange={e => setNewDupe({...newDupe, designerBrand: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Item Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leather Shoulder Bag"
                      value={newDupe.designerName}
                      onChange={e => setNewDupe({...newDupe, designerName: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Retail Price ($) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2400"
                      value={newDupe.designerPrice}
                      onChange={e => setNewDupe({...newDupe, designerPrice: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Category</label>
                    <select
                      value={newDupe.category}
                      onChange={e => setNewDupe({...newDupe, category: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    >
                      <option value="Dresses & Tops">Dresses & Tops</option>
                      <option value="Handbags">Handbags</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dupe Match Details */}
              <div className="space-y-3 pt-3 border-t border-[#E5E0D8]">
                <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">2. Affordable Dupe Alternative</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Dupe Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mango, Quince"
                      value={newDupe.dupeBrand}
                      onChange={e => setNewDupe({...newDupe, dupeBrand: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Dupe Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leather Slouchy Bag"
                      value={newDupe.dupeName}
                      onChange={e => setNewDupe({...newDupe, dupeName: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Dupe Price ($) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 68"
                      value={newDupe.dupePrice}
                      onChange={e => setNewDupe({...newDupe, dupePrice: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A554C] font-medium mb-1">Direct Buy Link URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newDupe.link}
                      onChange={e => setNewDupe({...newDupe, link: e.target.value})}
                      className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5A554C] font-medium mb-1">Why is it a great dupe?</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Same supple leather finish and gold hardware accents..."
                    value={newDupe.highlights}
                    onChange={e => setNewDupe({...newDupe, highlights: e.target.value})}
                    className="w-full p-2.5 bg-white border border-[#D5CFC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-[#D5CFC5] text-[#5A554C] font-semibold rounded-full hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#333] text-white font-semibold rounded-full transition shadow-md"
                >
                  Publish Dupe
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#E5E0D8] bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#7A756C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-serif font-bold text-xs">
              LK
            </div>
            <span className="font-serif font-bold text-[#1A1A1A] text-sm">LookALike</span>
            <span>— The Open Fashion Dupe Directory</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#5A554C]">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#affiliate" className="hover:underline">Affiliate Disclosure</a>
            <a href="#contact" className="hover:underline">Contact Support</a>
          </div>

          <div>
            © {new Date().getFullYear()} LookALike Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}