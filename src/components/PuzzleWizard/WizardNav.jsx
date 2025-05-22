import React from 'react';

export default function WizardNav({ steps, currentStep, onStepChange }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {steps.map((step, index) => {
          const isCurrent = currentStep === index;
          const isCompleted = currentStep > index;
          const isClickable = index <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepChange(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${isCurrent ? 'border-[#5EA2C4] text-[#5EA2C4]' : ''}
                ${isCompleted ? 'border-[#4DACA3] text-[#4DACA3]' : ''}
                ${!isCurrent && !isCompleted ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' : ''}
                ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {isCompleted && <span className="mr-2">✓</span>}
              {step.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
