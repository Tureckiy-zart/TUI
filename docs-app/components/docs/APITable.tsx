"use client";

import type { ComponentAPI } from "@/lib/autodocs/types";

interface APITableProps {
  data: ComponentAPI;
}

export function APITable({ data }: APITableProps) {
  return (
    <div className="space-y-6">
      {data.props && data.props.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-semibold">Prop</th>
                  <th className="p-2 text-left font-semibold">Type</th>
                  <th className="p-2 text-left font-semibold">Required</th>
                  <th className="p-2 text-left font-semibold">Default</th>
                  <th className="p-2 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {data.props.map((prop) => (
                  <tr key={prop.name} className="border-b">
                    <td className="p-2">
                      <code className="rounded bg-muted px-1 font-mono text-sm">{prop.name}</code>
                    </td>
                    <td className="p-2">
                      <code className="font-mono text-sm text-muted-foreground">{prop.type}</code>
                    </td>
                    <td className="p-2">
                      {prop.required ? (
                        <span className="text-destructive">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="p-2">
                      {prop.defaultValue ? (
                        <code className="rounded bg-muted px-1 font-mono text-sm">
                          {prop.defaultValue}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">{prop.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.variants && data.variants.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Variants</h3>
          <div className="space-y-4">
            {data.variants.map((variant) => (
              <div key={variant.name} className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold capitalize">{variant.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <code key={option} className="rounded bg-muted px-2 py-1 font-mono text-sm">
                      {option}
                    </code>
                  ))}
                </div>
                {variant.defaultValue && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Default: <code>{variant.defaultValue}</code>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
