import React, { useCallback } from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Step } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

const StepItem = ({
  step,
  currentStep,
  onStepClick,
}: {
  step: Step;
  currentStep: number;
  onStepClick: (stepId: number) => void;
}) => {
  return (
    <div
      className={`p-1 rounded-lg cursor-pointer transition-colors ${
        currentStep === step.id
          ? 'bg-gray-800 border border-gray-700'
          : 'hover:bg-gray-800'
      }`}
      onClick={() => onStepClick(step.id)}
    >
      <div className="flex items-center gap-2">
        {step.status === 'completed' ? (
          <CheckCircle className="w-6 h-6 rounded-full text-green-500" />
        ) : step.status === 'in-progress' ? (
          <Clock className="w-6 h-6 rounded-full text-blue-400" />
        ) : (
          <Circle className="w-6 h-6 rounded-full text-gray-600" />
        )}
        <h3 className="font-medium text-gray-100">{step.title}</h3>
      </div>
      <p className="text-sm text-gray-400 mt-2">{step.description}</p>
    </div>
  );
};

const MemoizedStepItem = React.memo(StepItem);

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  const handleStepClick = useCallback(
    (stepId: number) => {
      onStepClick(stepId);
    },
    [onStepClick]
  );

  return (
    <div className="rounded-lg shadow-lg p-3 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <MemoizedStepItem
            key={uuidv4()}
            step={step}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        ))}
      </div>
    </div>
  );
}