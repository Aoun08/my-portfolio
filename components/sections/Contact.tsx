"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const toastId = toast.loading('Sending your message to Aoun...');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setSubmitStatus('Message delivered directly to aounr3292@gmail.com!');
        toast.success('Message Sent Successfully! 🚀', {
          id: toastId,
          description: 'Delivered directly to aounr3292@gmail.com.',
          duration: 6000,
        });
      } else if (data.needsActivation) {
        setSubmitStatus('Activation link sent to aounr3292@gmail.com (Check Spam/Junk folder)');
        toast.warning('One-Time Setup: Activation Required ⚠️', {
          id: toastId,
          description: 'FormSubmit ne aounr3292@gmail.com par activation email bheja hai. Apne Gmail ke Inbox ya Spam/Junk folder mein ja kar "Activate Form" par click karein!',
          duration: 12000,
        });
      } else {
        toast.error('Delivery Error', {
          id: toastId,
          description: data.message || 'Opening mail app as backup...',
          duration: 6000,
        });
        if (data.fallbackMailto) {
          window.location.href = data.fallbackMailto;
        }
      }
    } catch (apiErr) {
      console.warn('API error:', apiErr);
      toast.info('Opening mail app as backup...', {
        id: toastId,
        description: 'Direct email draft prepared for aounr3292@gmail.com.',
        duration: 5000,
      });
      const mailto = `mailto:aounr3292@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
        `${formData.firstName} ${formData.lastName}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      )}`;
      window.location.href = mailto;
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="uppercase text-sm tracking-wider mb-2 text-[#00FFA3]">CONTACT ME</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
              LET'S MAKE YOUR<br />
              WEBSITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-teal-400">SHINE</span>.
            </h3>
            
            <p className="text-muted-foreground mb-8 max-w-md text-lg">
              Get the best offers without compromising quality. 
              Contact me now and let's discuss your next project.
            </p>
            
            <p className="text-muted-foreground font-medium">
              "Let's <span className="text-[#00FFA3]">grow</span> together" <span className="animate-pulse inline-block">--&gt;</span>
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full bg-background border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00FFA3]/50 focus:border-[#00FFA3] transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full bg-background border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00FFA3]/50 focus:border-[#00FFA3] transition-all"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-background border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00FFA3]/50 focus:border-[#00FFA3] transition-all"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full bg-background border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00FFA3]/50 focus:border-[#00FFA3] resize-none transition-all"
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 rounded-full bg-foreground text-background hover:bg-[#00FFA3] hover:text-black transition-all"
                  size="lg"
                >
                  {isSubmitting ? 'SENDING...' : 'SUBMIT MESSAGE'}
                </Button>
                {submitStatus && (
                  <p className="text-sm font-semibold text-[#00FFA3]">
                    ✓ {submitStatus}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}