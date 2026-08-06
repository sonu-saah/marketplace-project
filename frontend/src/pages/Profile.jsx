import React from "react";

export default function Profile() {
  return (
    <div className="min-h-[85vh] bg-slate-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 flex items-center gap-6 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg">
            SK
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Sonu Kumar Sah</h1>
            <p className="text-sm text-slate-400">sonusah22699@gmail.com</p>
            <span className="inline-block mt-2 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
              Verified Node Admin
            </span>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity & Orders</h2>
          <div className="border border-white/10 bg-slate-950/50 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Order #ORD12345</p>
              <p className="text-xs text-slate-400 mt-1">Placed on: Today</p>
            </div>
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}