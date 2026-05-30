"use client";

import { motion } from "framer-motion";
import { Laptop, X, Camera, PlayCircle, Globe, Code2, Mail, Phone, MapPin, Zap } from "lucide-react";

const footerLinks = {
  Shop: ["Gaming Laptops", "Business Laptops", "Student Laptops", "Creator Laptops", "Ultrabooks", "Budget Picks"],
  Support: ["Contact Us", "FAQ", "Shipping Info", "Returns & Refunds", "Warranty", "Track Order"],
  Company: ["About Us", "Press", "Careers", "Partners", "Blog", "Privacy Policy"],
};

const socials = [
  { Icon: X,          href: "#", label: "X (Twitter)" },
  { Icon: Camera,     href: "#", label: "Instagram"   },
  { Icon: PlayCircle, href: "#", label: "YouTube"      },
  { Icon: Globe,      href: "#", label: "Facebook"     },
  { Icon: Code2,      href: "#", label: "GitHub"       },
];

const payments = ["VISA", "MC", "AMEX", "PAYPAL", "APPLE"];

export default function Footer() {
  return (
    <footer className="bg-[#0F1419] text-[#E5E7EB]/40 border-t border-[#00FF88]/8">
      {/* Top accent line */}
      <div className="h-px bg-linear-to-r from-transparent via-[#00FF88]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 bg-[#00FF88] rounded-xl flex items-center justify-center"
                style={{ boxShadow: "0 0 16px rgba(0,255,136,0.4)" }}
              >
                <Laptop className="w-4.5 h-4.5 text-[#0F1419]" />
              </div>
              <span className="text-xl font-black text-[#E5E7EB] tracking-tight">
                LAP<span className="text-[#00FF88]" style={{ textShadow: "0 0 12px rgba(0,255,136,0.5)" }}>STORE</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs">
              Your trusted source for premium laptops. 500+ models from all major brands, with expert support and the best prices guaranteed.
            </p>

            <div className="space-y-2.5 text-sm">
              {[
                { Icon: Phone, text: "1-800-LAPSTORE" },
                { Icon: Mail,  text: "hello@lapstore.com" },
                { Icon: MapPin,text: "San Francisco, CA 94105" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, color: "#00FF88", borderColor: "rgba(0,255,136,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-[#1A2129] border border-[#E5E7EB]/5 text-[#E5E7EB]/30 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <div key={title}>
              <p className="text-[#E5E7EB] font-bold text-sm mb-5 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#00FF88]" />
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <motion.li key={link} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: colIdx * 0.05 + i * 0.04 }}>
                    <a
                      href="#"
                      className="text-sm hover:text-[#00FF88] transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#00FF88] transition-all duration-200 origin-left" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E7EB]/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#E5E7EB]/20">
            © 2026 LapStore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            {["Terms", "Privacy", "Cookies"].map((t) => (
              <a key={t} href="#" className="hover:text-[#00FF88] transition-colors">{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {payments.map((p) => (
              <div
                key={p}
                className="h-6 px-2 bg-[#1A2129] border border-[#E5E7EB]/5 rounded text-[10px] text-[#E5E7EB]/25 flex items-center font-mono"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
