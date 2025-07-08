import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Car, Users, Search, DollarSign, Shield, MessageCircle, Star, CheckCircle2, AlertCircle, Zap, Cpu, Wifi } from 'lucide-react';

interface FormData {
  q1_city_state: string;
  q2_age_group: string;
  q3_occupation: string;
  q4_purchased_car: string;
  q5_car_type: string[];
  q6_challenges: string[];
  q7_value_in_tool: string;
  q8_willing_to_pay: string;
  q9_reasonable_price: string;
  q10_buy_other_city: string[];
  q11_price_importance: string;
  q12_platform_fee_willingness: string;
  q13_fair_platform_fee: string;
  q14_considered_used_car: string;
  q15_use_upload_eval_tool: string;
  q16_pay_for_eval: string;
  q17_concerns_other_city: string[];
  q18_recommend_platform: string;
  q19_contact_info: string;
  q20_feature_suggestions: string;
}


const initialFormData: FormData = {
  q1_city_state: '',
  q2_age_group: '',
  q3_occupation: '',
  q4_purchased_car: '',
  q5_car_type: [],
  q6_challenges: [],
  q7_value_in_tool: '',
  q8_willing_to_pay: '',
  q9_reasonable_price: '',
  q10_buy_other_city: [],
  q11_price_importance: '',
  q12_platform_fee_willingness: '',
  q13_fair_platform_fee: '',
  q14_considered_used_car: '',
  q15_use_upload_eval_tool: '',
  q16_pay_for_eval: '',
  q17_concerns_other_city: [],
  q18_recommend_platform: '',
  q19_contact_info: '',
  q20_feature_suggestions: '',
};

const sections = [
  { id: 1, title: 'About You', icon: Users, color: 'from-cyan-400 to-blue-500' },
  { id: 2, title: 'Car Buying Behavior', icon: Car, color: 'from-blue-400 to-purple-500' },
  { id: 3, title: 'Car Recommendation Tool', icon: Star, color: 'from-purple-400 to-pink-500' },
  { id: 4, title: 'Best Deal Finder', icon: DollarSign, color: 'from-pink-400 to-red-500' },
  { id: 5, title: 'Used Car Evaluation', icon: Search, color: 'from-red-400 to-orange-500' },
  { id: 6, title: 'Trust', icon: Shield, color: 'from-orange-400 to-yellow-500' },
  { id: 7, title: 'Final Feedback', icon: MessageCircle, color: 'from-yellow-400 to-green-500' }
];

import { supabase } from './supabaseClient';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.from('car_survey_responses').insert([formData]);

  if (error) {
    console.error('Insert error:', error); // <- ADD THIS
    alert('Submission failed');
  } else {
    setIsSubmitted(true);
  }
};

  const renderProgressBar = () => {
    const progress = (currentSection / sections.length) * 100;

    return (
      <div className="relative w-full max-w-md mx-auto h-3 bg-gray-900/50 rounded-full mb-8 overflow-hidden border border-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-full" />
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/50 via-purple-400/50 to-pink-400/50 animate-pulse" />
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Cpu size={12} className="text-cyan-400 animate-spin" />
        </div>
      </div>
    );
  };

  const renderSectionNav = () => {
    return (
      <div className="w-full overflow-x-auto px-4 mb-12">
        <div className="min-w-max flex justify-center">
          <div className="flex space-x-3 p-2 bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-gray-700/30">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = currentSection === section.id;
              const isCompleted = currentSection > section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`relative p-4 rounded-xl transition-all duration-500 group flex-shrink-0 ${
                    isActive
                      ? `bg-gradient-to-r ${section.color} text-white shadow-2xl scale-110`
                      : isCompleted
                      ? 'bg-gray-700/50 text-green-400 hover:bg-gray-600/50'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="relative z-10">
                    <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  </div>

                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl animate-pulse" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur-sm" />
                    </>
                  )}

                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                  )}

                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderRadioGroup = (
    name: string,
    options: string[],
    value: string,
    onChange: (value: string) => void
  ) => {
    return (
      <div className="space-y-4">
        {options.map((option, index) => (
          <label key={option} className="flex items-center space-x-4 cursor-pointer group relative">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              value === option
                ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/50'
                : 'border-gray-600 group-hover:border-gray-400 group-hover:shadow-lg group-hover:shadow-gray-400/20'
            }`}>
              {value === option && (
                <>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
                </>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className={`text-gray-300 group-hover:text-white transition-all duration-300 ${
              value === option ? 'text-white font-medium' : ''
            }`}>
              {option}
            </span>
            {value === option && (
              <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            )}
          </label>
        ))}
      </div>
    );
  };

  const renderCheckboxGroup = (
    options: string[],
    values: string[],
    onChange: (value: string) => void
  ) => {
    return (
      <div className="space-y-4">
        {options.map((option, index) => (
          <label key={option} className="flex items-center space-x-4 cursor-pointer group relative">
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => onChange(option)}
              className="hidden"
            />
            <div className={`relative w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
              values.includes(option)
                ? 'border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-400/50'
                : 'border-gray-600 group-hover:border-gray-400 group-hover:shadow-lg group-hover:shadow-gray-400/20'
            }`}>
              {values.includes(option) && (
                <>
                  <CheckCircle2 size={16} className="text-cyan-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg bg-cyan-400/20 animate-pulse" />
                </>
              )}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className={`text-gray-300 group-hover:text-white transition-all duration-300 ${
              values.includes(option) ? 'text-white font-medium' : ''
            }`}>
              {option}
            </span>
            {values.includes(option) && (
              <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            )}
          </label>
        ))}
      </div>
    );
  };

  const renderSection = () => {
    const currentSectionData = sections[currentSection - 1];
    
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  About You
                </h2>
                <p className="text-gray-400 text-lg">Initialize your profile data</p>
                <div className="flex justify-center mt-4">
                  <Wifi className="text-cyan-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <Zap size={16} className="text-cyan-400" />
                  <span>Please Enter Your Name</span>
                </label>
                <input
                  type="text"
                  value={formData.q1_city_state}
                  onChange={(e) => handleInputChange('q1_city_state', e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-500 text-white placeholder-gray-500 backdrop-blur-sm"
                  placeholder="e.g., Shubam"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Cpu size={16} className="text-purple-400" />
                  <span>Age Group</span>
                </label>
                {renderRadioGroup(
                  'q2_age_group',
                  ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+'],
                  formData.q2_age_group,
                  (value) => handleInputChange('q2_age_group', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Users size={16} className="text-green-400" />
                  <span>What is your current occupation?</span>
                </label>
                {renderRadioGroup(
                  'q3_occupation',
                  ['Student', 'Working Professional', 'Business Owner', 'Homemaker', 'Retired', 'None of the above'],
                  formData.q3_occupation,
                  (value) => handleInputChange('q3_occupation', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Car size={16} className="text-blue-400" />
                  <span>Have you ever purchased a car?</span>
                </label>
                {renderRadioGroup(
                  'q4_purchased_car',
                  ['Yes – New', 'Yes – Used', 'Both', 'No'],
                  formData.q4_purchased_car,
                  (value) => handleInputChange('q4_purchased_car', value)
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  Car Buying Behavior
                </h2>
                <p className="text-gray-400 text-lg">Analyzing your preferences</p>
                <div className="flex justify-center mt-4">
                  <Car className="text-blue-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                <Star size={16} className="text-yellow-400" />
                <span>If you were to buy a car, which type would you consider? (Select all that apply)</span>
              </label>
              {renderCheckboxGroup(
                ['New Car', 'Used Car', 'Not sure yet'],
                formData.q5_car_type,
                (value) => handleMultiSelectChange('q5_car_type', value)
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  Car Finder Tool
                </h2>
                <p className="text-gray-400 text-lg">New Cars - AI-powered recommendations</p>
                <div className="flex justify-center mt-4">
                  <Star className="text-purple-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <AlertCircle size={16} className="text-red-400" />
                  <span>What are the biggest challenges you face while choosing a new or used car? (Select up to 2)</span>
                </label>
                {renderCheckboxGroup(
                  [
                    'Too many options, hard to choose',
                    'Not sure which variant/engine/transmission to pick',
                    'Don\'t trust YouTube reviews',
                    'Don\'t know how to evaluate a used car',
                    'Can\'t find the best deal or discount',
                    'Long waiting periods',
                    'Worried about scams or fake documents',
                    'None of the above'
                  ],
                  formData.q6_challenges,
                  (value) => handleMultiSelectChange('q6_challenges', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Cpu size={16} className="text-cyan-400" />
                  <span>Would you find value in a tool that suggests the best car model and variant for you — based on your usage, budget, lifestyle, driving behavior, and habits?</span>
                </label>
                {renderRadioGroup(
                  'q7_value_in_tool',
                  ['Yes, definitely', 'Maybe', 'No'],
                  formData.q7_value_in_tool,
                  (value) => handleInputChange('q7_value_in_tool', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-400" />
                  <span>Would you be willing to pay for a personalized recommendation based on your usage, budget, lifestyle, driving behavior, and habits?</span>
                </label>
                {renderRadioGroup(
                  'q8_willing_to_pay',
                  ['Yes', 'No', 'Depends on the pricing'],
                  formData.q8_willing_to_pay,
                  (value) => handleInputChange('q8_willing_to_pay', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <DollarSign size={16} className="text-yellow-400" />
                  <span>If yes, what would you consider a reasonable price for this service?</span>
                </label>
                {renderRadioGroup(
                  'q9_reasonable_price',
                  ['Free', '₹99–199', '₹200–499', '₹500+'],
                  formData.q9_reasonable_price,
                  (value) => handleInputChange('q9_reasonable_price', value)
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  💸 Best Deal Finder
                </h2>
                <p className="text-gray-400 text-lg">New Car from Other Cities</p>
                <div className="flex justify-center mt-4">
                  <DollarSign className="text-pink-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Search size={16} className="text-orange-400" />
                  <span>Would you consider buying a car from another city if it meant any of the following? (Select all that apply)</span>
                </label>
                {renderCheckboxGroup(
                  [
                    'Getting a very good discount (e.g., ₹60,000–₹70,000 on a ₹20 lakh car)',
                    'Getting faster delivery (less waiting time)',
                    'Both — I\'d go for it if the deal is great and delivery is quick',
                    'No — I prefer buying only from a local dealership'
                  ],
                  formData.q10_buy_other_city,
                  (value) => handleMultiSelectChange('q10_buy_other_city', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Star size={16} className="text-red-400" />
                  <span>How important is getting the best price or faster availability on a new car to you?</span>
                </label>
                {renderRadioGroup(
                  'q11_price_importance',
                  ['Extremely important', 'Somewhat important', 'Not a priority'],
                  formData.q11_price_importance,
                  (value) => handleInputChange('q11_price_importance', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-400" />
                  <span>Would you pay a fee for a platform that finds the best deal and/or fastest delivery and arranges transport + registration for you?</span>
                </label>
                {renderRadioGroup(
                  'q12_platform_fee_willingness',
                  ['Yes', 'Maybe', 'No'],
                  formData.q12_platform_fee_willingness,
                  (value) => handleInputChange('q12_platform_fee_willingness', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <DollarSign size={16} className="text-yellow-400" />
                  <span>What would you consider a fair one-time fee for this end-to-end service?</span>
                </label>
                {renderRadioGroup(
                  'q13_fair_platform_fee',
                  ['₹0', '₹499–999', '₹1000–1999', '₹2000+'],
                  formData.q13_fair_platform_fee,
                  (value) => handleInputChange('q13_fair_platform_fee', value)
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  🔍 Used Car Evaluation Checker
                </h2>
                <p className="text-gray-400 text-lg">Smart evaluation services</p>
                <div className="flex justify-center mt-4">
                  <Search className="text-red-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Car size={16} className="text-orange-400" />
                  <span>Have you ever considered buying a used car?</span>
                </label>
                {renderRadioGroup(
                  'q14_considered_used_car',
                  ['Yes', 'No', 'Planning to in the future'],
                  formData.q14_considered_used_car,
                  (value) => handleInputChange('q14_considered_used_car', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Cpu size={16} className="text-yellow-400" />
                  <span>Would you use a service where you upload used car photos and documents, and it gives you a buying decision + fair price valuation?</span>
                </label>
                {renderRadioGroup(
                  'q15_use_upload_eval_tool',
                  ['Yes', 'Maybe', 'No'],
                  formData.q15_use_upload_eval_tool,
                  (value) => handleInputChange('q15_use_upload_eval_tool', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-400" />
                  <span>How much would you be willing to pay for this used car evaluation service?</span>
                </label>
                {renderRadioGroup(
                  'q16_pay_for_eval',
                  ['₹0 – I prefer it free', '₹100–199', '₹200–399', '₹400+'],
                  formData.q16_pay_for_eval,
                  (value) => handleInputChange('q16_pay_for_eval', value)
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-green-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  🔐 Trust & Recommendation
                </h2>
                <p className="text-gray-400 text-lg">Your concerns and recommendations</p>
                <div className="flex justify-center mt-4">
                  <Shield className="text-orange-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <AlertCircle size={16} className="text-red-400" />
                  <span>What concerns would you have when buying a car from another city? (Select all that apply)</span>
                </label>
                {renderCheckboxGroup(
                  [
                    'Payment security',
                    'Transport damage',
                    'Delayed delivery',
                    'Registration/legal issues',
                    'Warranty/service support',
                    'None, I\'m okay with it',
                    'Other (please specify)'
                  ],
                  formData.q17_concerns_other_city,
                  (value) => handleMultiSelectChange('q17_concerns_other_city', value)
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-6 flex items-center space-x-2">
                  <Users size={16} className="text-green-400" />
                  <span>Would you recommend such a platform to a friend or family member if it worked well for you?</span>
                </label>
                {renderRadioGroup(
                  'q18_recommend_platform',
                  ['Yes', 'Maybe', 'No'],
                  formData.q18_recommend_platform,
                  (value) => handleInputChange('q18_recommend_platform', value)
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-10">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-green-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 p-8">
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent mb-4 animate-pulse`}>
                  💬 Final Feedback
                </h2>
                <p className="text-gray-400 text-lg">Help us improve our services</p>
                <div className="flex justify-center mt-4">
                  <MessageCircle className="text-yellow-400 animate-pulse" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <Wifi size={16} className="text-cyan-400" />
                  <span>Would you like to be contacted when these services are launched? (Leave email or phone, optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.q19_contact_info}
                  onChange={(e) => handleInputChange('q19_contact_info', e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-500 text-white placeholder-gray-500 backdrop-blur-sm"
                  placeholder="Your email or phone number"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <MessageCircle size={16} className="text-green-400" />
                  <span>Any suggestions or features you would want in such a car buying support platform?</span>
                </label>
                <textarea
                  value={formData.q20_feature_suggestions}
                  onChange={(e) => handleInputChange('q20_feature_suggestions', e.target.value)}
                  rows={5}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-500 text-white placeholder-gray-500 backdrop-blur-sm resize-none"
                  placeholder="Share your thoughts and suggestions..."
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>
        );
 
      default:
        return null;
    }
  };


  if (isSubmitted) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center p-12">
        <CheckCircle2 size={80} className="text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="text-xl text-gray-300">
          We appreciate your time in completing the survey.
        </p>
      </div>
    </div>
  );
}

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '15s' }} />
        </div>

        <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-12 max-w-lg w-full border border-gray-700/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl animate-pulse" />
          <div className="relative z-10">
            <div className="relative mb-8">
              <Cpu size={80} className="text-cyan-400 mx-auto animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-ping" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Processing Data...
            </h2>
            <p className="text-gray-300 text-lg">
              Transmitting your responses to the quantum database
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
        
        {/* Mouse follower effect */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-2xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl" />
            <div className="relative z-10 p-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Car size={60} className="text-cyan-400 animate-pulse" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-ping" />
                </div>
              </div>
              <h1 className="text-6xl font-bold mb-4 relative">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  Car Buying Experience
                </span>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />
              </h1>
              <p className="text-2xl text-gray-400 mb-8 font-light">& Interest Survey</p>
              <div className="flex justify-center space-x-4 mb-8">
                <Zap className="text-yellow-400 animate-pulse" size={20} />
                <Cpu className="text-cyan-400 animate-spin" size={20} />
                <Wifi className="text-green-400 animate-pulse" size={20} />
              </div>
              {renderProgressBar()}
            </div>
          </div>

          {/* Section Navigation */}
          {renderSectionNav()}

          {/* Main Content */}
          <div className="bg-gray-900/30 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700/30 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl animate-pulse" />
            <div className="relative z-10">
              {renderSection()}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16">
                <button
                  onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                  disabled={currentSection === 1}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-500 relative overflow-hidden ${
                    currentSection === 1
                      ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50'
                  }`}
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Previous</span>
                  {currentSection !== 1 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>

                {currentSection === sections.length ? (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-500 shadow-lg hover:shadow-2xl relative overflow-hidden border border-cyan-400/30"
                  >
                    <span className="font-medium">Submit Survey</span>
                    <CheckCircle2 size={20} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentSection(Math.min(sections.length, currentSection + 1))}
                    className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-500 shadow-lg hover:shadow-2xl relative overflow-hidden border border-cyan-400/30"
                  >
                    <span className="font-medium">Next</span>
                    <ChevronRight size={20} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <p className="text-gray-500 font-medium">
                Section {currentSection} of {sections.length}
              </p>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
            
            {/* Credit */}
            <div className="pt-8">
              <p className="text-gray-600 text-xs font-light tracking-wider">
                Made by Shubam Sarawagi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;