import React, { useState } from 'react';
import { DropdownCheckboxSelect, Option } from './DropdownCheckboxSelect';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const categories: Option[] = [
  { key: 'web', label: 'Web Development' },
  { key: 'design', label: 'Design' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'devops', label: 'DevOps' },
  { key: 'content', label: 'Content' },
];

export default function CategoryPickerDemo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="p-6 max-w-md space-y-4">
      <h2 className="text-lg font-bold">Pick categories</h2>

      <DropdownCheckboxSelect
        options={categories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
        placeholder="Select category"
        multiple={true} // Set to false for single selection
        icon={faTag}
      />

      <p className="text-sm text-gray-600">
        Selected keys: <code>{JSON.stringify(selectedCategories)}</code>
      </p>
    </div>
  );
}