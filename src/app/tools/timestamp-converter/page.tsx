"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/ui/CopyButton";
import { Card, CardContent } from "@/components/ui/Card";

export default function TimestampConverterPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("timestamp-converter")!;
  const toolT = t.tools.timestampConverter;

  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [dateResult, setDateResult] = useState("");
  
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [timestampResult, setTimestampResult] = useState("");

  // Update current timestamp every second
  useEffect(() => {
    const updateTimestamp = () => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert timestamp to date
  const convertToDate = () => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setDateResult("Invalid timestamp");
        return;
      }
      
      const ms = unit === "seconds" ? ts * 1000 : ts;
      const date = new Date(ms);
      
      if (isNaN(date.getTime())) {
        setDateResult("Invalid timestamp");
        return;
      }

      const local = date.toLocaleString();
      const utc = date.toUTCString();
      const iso = date.toISOString();
      
      setDateResult(`${toolT.localTime}: ${local}\nUTC: ${utc}\nISO: ${iso}`);
    } catch {
      setDateResult("Invalid timestamp");
    }
  };

  // Convert date to timestamp
  const convertToTimestamp = () => {
    try {
      const dateTimeStr = `${dateInput}T${timeInput || "00:00"}`;
      const date = new Date(dateTimeStr);
      
      if (isNaN(date.getTime())) {
        setTimestampResult("Invalid date");
        return;
      }

      const seconds = Math.floor(date.getTime() / 1000);
      const milliseconds = date.getTime();
      
      setTimestampResult(`${toolT.seconds}: ${seconds}\n${toolT.milliseconds}: ${milliseconds}`);
    } catch {
      setTimestampResult("Invalid date");
    }
  };

  // Set current date/time
  const setNow = () => {
    const now = new Date();
    setDateInput(now.toISOString().split("T")[0]);
    setTimeInput(now.toTimeString().slice(0, 5));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Current Timestamp */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">
                  {toolT.currentTimestamp}
                </h3>
                <p className="text-4xl font-mono font-bold text-white">
                  {currentTimestamp}
                </p>
              </div>
              <CopyButton text={currentTimestamp.toString()} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timestamp to Date */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                {toolT.toDate}
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Unix Timestamp"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder={toolT.timestampPlaceholder}
                  className="font-mono"
                />

                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      checked={unit === "seconds"}
                      onChange={() => setUnit("seconds")}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-300">{toolT.seconds}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      checked={unit === "milliseconds"}
                      onChange={() => setUnit("milliseconds")}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-300">{toolT.milliseconds}</span>
                  </label>
                </div>

                <Button onClick={convertToDate} className="w-full">
                  {t.convert}
                </Button>

                {dateResult && (
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        {dateResult}
                      </pre>
                      <CopyButton text={dateResult} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Date to Timestamp */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                {toolT.toTimestamp}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                  <Input
                    label="Time"
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={convertToTimestamp} className="flex-1">
                    {t.convert}
                  </Button>
                  <Button variant="secondary" onClick={setNow}>
                    Now
                  </Button>
                </div>

                {timestampResult && (
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        {timestampResult}
                      </pre>
                      <CopyButton text={timestampResult} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reference */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Quick Reference
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <p className="text-gray-500 mb-1">1 minute</p>
                <p className="font-mono text-gray-300">60</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <p className="text-gray-500 mb-1">1 hour</p>
                <p className="font-mono text-gray-300">3,600</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <p className="text-gray-500 mb-1">1 day</p>
                <p className="font-mono text-gray-300">86,400</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <p className="text-gray-500 mb-1">1 week</p>
                <p className="font-mono text-gray-300">604,800</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
