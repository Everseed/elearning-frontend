"use client";
import { Card, CardContent, CardHeader, Separator } from "@ng-youth/ui";
import { DashboardSummary } from "@ng-youth/lib/models";
import { formatAbbreviate, uppercaseFirstChar } from "@ng-youth/lib/utils";
import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

function EnrolledPieChart({ summary }: { summary: DashboardSummary }) {
  const { theme } = useTheme();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let chart: Chart<"doughnut"> | undefined = undefined;

    if (!canvas) {
      return;
    }

    const tooltipBackground =
      theme === "dark" ? "rgb(255, 255, 255)" : undefined;
    const tooltipText = theme === "dark" ? "rgb(0, 0, 0)" : undefined;

    const chartData: ChartData<"doughnut"> = {
      labels: Object.keys(summary.enrolledByLevel).map((k) =>
        uppercaseFirstChar(k),
      ),
      datasets: [
        {
          backgroundColor: [
            "rgb(56, 176, 0)",
            "rgb(253, 197, 0)",
            "rgb(80, 72, 229)",
          ],
          data: Object.values(summary.enrolledByLevel),
          hoverOffset: 10,
          offset: 5,
          hoverBackgroundColor: [
            "rgb(56, 176, 0)",
            "rgb(253, 197, 0)",
            "rgb(80, 72, 229)",
          ],
          hoverBorderWidth: 0,
          borderWidth: 0,
        },
      ],
    };

    const chartConfig: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: chartData,
      options: {
        maintainAspectRatio: true,
        cutout: "70%",
        layout: {
          padding: 20,
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
          tooltip: {
            backgroundColor: tooltipBackground,
            titleColor: tooltipText,
            bodyColor: tooltipText,
          },
        },
      },
    };

    chart = new Chart(canvas, chartConfig);

    return () => {
      chart?.destroy();
    };
  }, [canvas, summary, theme]);

  const total = useMemo(() => {
    return Object.values(summary.enrolledByLevel).reduce(
      (pv, cv) => pv + cv,
      0,
    );
  }, [summary]);

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="h-16 px-4 justify-center">
        <h4 className="">Enrolled by level</h4>
      </CardHeader>
      <Separator />
      <CardContent className="py-4 px-0 justify-center items-center h-full relative">
        <canvas ref={setCanvas} />
        {total <= 0 ? (
          <div className="text-muted-foreground absolute left-[50%] top-[35%] translate-x-[-50%]">
            No chart data
          </div>
        ) : (
          <div className="text-muted-foreground absolute left-[50%] top-[35%] translate-x-[-50%]">
            {formatAbbreviate(total)} Enrolled
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EnrolledPieChart;
