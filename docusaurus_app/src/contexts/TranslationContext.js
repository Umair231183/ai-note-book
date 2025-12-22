import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [selectedText, setSelectedText] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to translate selected text
  const translateSelectedText = async () => {
    if (!selectedText) return;

    setIsLoading(true);
    try {
      // In a real implementation, this would call your backend translation API
      // For now, we'll simulate the translation with a simple mapping
      // In a real app, you would call your backend API
      // const response = await fetch('/api/translate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     text: selectedText,
      //     target_language: 'ur',
      //   }),
      // });
      //
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // const data = await response.json();
      // setTranslation(data.translated_text || 'ترجمہ ہو رہا ہے...');

      // Simulated translation for demonstration
      // In a real app, replace this with actual API call
      setTimeout(() => {
        // This is a simplified simulation - in a real app you'd use a proper translation API
        const simpleTranslations = {
          'AI': 'مصنوعی ذہانت',
          'education': 'تعلیم',
          'classroom': 'کلاس روم',
          'efficiency': 'کارکردگی',
          'student': 'طلبہ',
          'learning': 'سیکھنا',
          'technology': 'ٹیکنالوجی',
          'research': 'تحقیق',
          'paper': 'مکالہ',
          'artificial intelligence': 'مصنوعی ذہانت',
          'k-12': 'کے-12',
          'impact': 'اثر',
          'improvements': 'بہتری',
          'integration': 'انضمام',
          'settings': 'سیٹنگز',
          'findings': 'نتائج',
          'engagement': 'مشغولیت',
          'personalized': ' ذاتی',
          'administrative': 'انتظامی',
          'educators': 'معلمین',
          'assessment': 'جائزہ',
          'feedback': 'رائے',
          'mechanisms': 'طریقہ کار',
          'diverse': 'متنوع',
          'needs': 'ضرورتیں',
          'burden': 'بوجھ',
          'enhanced': 'بہتر',
          'experiences': 'تجربے',
          'increased': 'اضافہ',
          'reduced': 'کم',
          'significant': 'اہم',
          'properly': 'مناسب طریقے سے',
          'Our research reveals significant improvements in classroom efficiency when AI technologies are properly integrated into educational settings. Key findings include:': 'ہماری تحقیق سے پتہ چلتا ہے کہ جب مصنوعی ذہانت کی ٹیکنالوجی کو تعلیمی ماحول میں مناسب طریقے سے ضم کیا جاتا ہے تو کلاس روم کی کارکردگی میں اہم بہتری آتی ہے۔ اہم نتائج میں شامل ہیں:',
          'Increased student engagement by 40%': 'طلباء کی مشغولیت میں 40 فیصد اضافہ',
          'Personalized learning experiences for diverse student needs': 'متنوع طلباء کی ضروریات کے لئے ذاتی نوعیت کے سیکھنے کے تجربات',
          'Reduced administrative burden on educators': 'معلمین پر انتظامی بوجھ کم ہو گیا',
          'Enhanced assessment and feedback mechanisms': 'بہتر جائزہ اور رائے دہی کے طریقہ کار'
        };

        // Try to find a direct translation, otherwise use a placeholder
        let translated = simpleTranslations[selectedText.toLowerCase()] ||
                        simpleTranslations[selectedText.toLowerCase().trim()] ||
                        simpleTranslations[selectedText] ||
                        '...ترجمہ کیا جا رہا ہے';

        setTranslation(translated);
      }, 500); // Simulate network delay
    } catch (err) {
      console.error("Translation error:", err);
      // Fallback: use a simple simulated translation
      setTranslation('یہ متن اردو میں ترجمہ کیا جا رہا ہے');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear translation
  const clearTranslation = () => {
    setSelectedText(null);
    setTranslation(null);
  };

  // Listen for text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection.toString().trim() !== '') {
        setSelectedText(selection.toString().trim());
      } else {
        clearTranslation();
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection); // For keyboard selections

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  return (
    <TranslationContext.Provider
      value={{
        selectedText,
        translation,
        isLoading,
        translateSelectedText,
        clearTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};