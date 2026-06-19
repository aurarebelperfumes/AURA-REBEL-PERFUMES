import React, { useState, useEffect } from 'react';
import { Mail, Instagram, MapPin, Send, CheckCircle, RefreshCw, MessageSquare, Trash2, Clock, Globe } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactSection() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('wholesale');
  const [message, setMessage] = useState('');
  
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('aura_rebel_contacts');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newMessage: ContactMessage = {
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toISOString().split('T')[0],
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('aura_rebel_contacts', JSON.stringify(updated));

    // Reset Form
    setName('');
    setEmail('');
    setMessage('');
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('aura_rebel_contacts');
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-[90vh] py-16 font-sans" id="contact-us-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-[0.3em] font-bold">Inquiries & Custom Blends</span>
          <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white mt-2">Connect with Us</h2>
          <p className="font-sans text-xs text-stone-400 mt-2 leading-relaxed font-light">
            Have questions about restocks, wholesale distribution, custom fragrance collaborations, or private custom batch blends? Drop us a prompt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side (Instagram, Scent Lab address etc.) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-stone-900/40 border border-stone-900 rounded-3xl p-6 sm:p-10 space-y-6">
              <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-stone-100">
                AURA REBEL HEADQUARTERS
              </h3>
              <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                Our main formulation lab and scent vault is based out of London. For quick replies, our Instagram DM channel is always active.
              </p>

              <div className="space-y-4">
                
                {/* Email (Personalized) */}
                <div className="flex items-center space-x-4 border-b border-stone-850 pb-4">
                  <div className="p-2.5 bg-stone-950 text-amber-500 rounded-xl border border-stone-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-stone-500 uppercase">Direct Email</span>
                    <a href="mailto:aurarebelperfumes@gmail.com" className="block font-sans text-xs font-bold text-stone-200 hover:text-amber-400">
                      aurarebelperfumes@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram Handle */}
                <div className="flex items-center space-x-4 border-b border-stone-850 pb-4">
                  <div className="p-2.5 bg-stone-950 text-rose-450 rounded-xl border border-stone-800">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-stone-500 uppercase">Instagram Page</span>
                    <a 
                      href="https://www.instagram.com/aurarebel_perfumes" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block font-sans text-xs font-bold text-stone-200 hover:text-amber-400"
                    >
                      @aurarebel_perfumes
                    </a>
                  </div>
                </div>

                {/* Scent Lab Address / Coordinates */}
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-stone-950 text-emerald-450 rounded-xl border border-stone-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-stone-500 uppercase">Coordinates</span>
                    <p className="block font-sans text-xs font-bold text-stone-250">
                      Warehouse 70, Shoreditch Art Loop, London, E1
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Wholesale Info banner */}
            <div className="bg-gradient-to-tr from-rose-950/20 to-amber-950/20 border border-stone-900 rounded-2xl p-6">
              <span className="block font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider">Wholesale Information</span>
              <p className="font-sans text-xs text-stone-400 leading-relaxed font-light mt-1.5">
                Are you a high-end concept lifestyle store, luxury barbershop, or boutique retailer looking to carry our small-batch extracts? Use the inquiry portal and select "Wholesale" as your category to get custom sample testers shipped.
              </p>
            </div>
          </div>

          {/* Contact Form & Persisted Messages Terminal */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Form */}
            <div className="bg-stone-900/30 border border-stone-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-white mb-6">
                Transmit an Inquiry
              </h3>
              
              {submitSuccess ? (
                <div className="p-4 bg-emerald-900/20 border border-emerald-800/30 text-emerald-400 rounded-2xl flex items-start space-x-3.5 space-y-0.5 animate-bounce">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase">Transmission Receipt Confirmed</p>
                    <p className="font-sans text-[11px] text-stone-400 mt-1 font-light">
                      Your query was captured and written to local storage. Check the log ledger below to verify.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-stone-400 uppercase font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robin Rebel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-stone-400 uppercase font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. customer@rebel.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-stone-400 uppercase font-semibold">Subject Matter</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 text-stone-350 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer font-sans"
                    >
                      <option value="wholesale">Wholesale & Partner Accounts</option>
                      <option value="custom">Bespoke Custom Blend Consultation</option>
                      <option value="press">Press & Instagram Collaborative Outreach</option>
                      <option value="support">Order Status & Scent Returns</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-stone-400 uppercase font-semibold">Olfactory Prompt / Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail your scent targets, bulk requirements, or collaboration brief..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-100 hover:bg-amber-400 text-stone-950 py-4.5 rounded-xl font-sans text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 transition-transform cursor-pointer hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Scent Prompt</span>
                  </button>

                </form>
              )}
            </div>

            {/* Persisted Logs Terminal (Displays client messaging history) */}
            {messages.length > 0 && (
              <div className="bg-stone-950 border border-stone-900 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-stone-200">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase">
                      Transmission Logs ({messages.length})
                    </h4>
                  </div>
                  <button
                    onClick={clearMessages}
                    className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-rose-500 hover:text-rose-400 font-bold uppercase transition-colors"
                    title="Purge logs from local storage"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear logs</span>
                  </button>
                </div>

                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-2">
                  {messages.map((msg, i) => (
                    <div key={i} className="bg-stone-900/30 border border-stone-850 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-sans text-xs font-bold text-stone-100">{msg.name}</span>
                          <span className="block font-mono text-[9px] text-stone-500">{msg.email}</span>
                        </div>
                        <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-[8px] font-mono uppercase text-amber-500 text-right">
                          {msg.subject}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed italic bg-stone-950/20 p-2.5 rounded-lg border border-stone-900/30">
                        "{msg.message}"
                      </p>
                      <div className="flex justify-end text-[9px] font-mono text-stone-600">
                        <span>Logged: {msg.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
