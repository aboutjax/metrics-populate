// Map of metric types to their random but realistic display values
export function getTextValue(label: string) {
    switch (label.toLowerCase()) {
        case "duration":
            // Random duration between 30mins and 2hrs
            return formatDuration(randomInt(30, 120));
        case "heart rate (bpm)":
            // Typical heart rate range during exercise
            return randomInt(120, 180).toString();
        case "power (w)":
            // Typical cycling power output in watts
            return randomInt(150, 400).toString();
        case "cadence (rpm)":
            // Typical cycling cadence
            return randomInt(70, 100).toString();
        case "current gear":
            // Front gear - Back gear combination
            return `${randomInt(1, 2)}–${randomInt(1, 11)}`;
        case "speed (km/h)":
            // Typical cycling speed
            return randomFloat(15, 45, 1).toString();
        case "speed (kph)":
            // Typical cycling speed
            return randomFloat(15, 45, 1).toString();
        case "grade (%)":
            // Realistic road grade percentage
            return `${randomFloat(-8, 12, 1).toString()}`;
        case "distance (km)":
            // Reasonable cycling distance
            return randomFloat(5, 120, 1).toString();
        case "calories (cal)":
            // Typical calorie burn for cycling
            return randomInt(200, 2000).toString();
        case "phone battery (%)":
            // Typical phone battery
            return `${randomInt(0, 100).toString()}`
        case "tss":
            // Typical tss value
            return randomFloat(0, 2).toString();
        case "lap 1 duration":
            return formatDuration(randomInt(2, 10));
        case "lap 1 power (w)":
            return randomInt(150, 400).toString();
        case "lap 1 heart rate (bpm)":
            return randomInt(100, 180).toString();
        case "lap 1 cadence (rpm)":
            return randomInt(60, 80).toString();
        case "lap 1 speed (kph)":
            return randomFloat(15, 45, 1).toString();
        case "lap 1 distance (km)":
            return randomFloat(5, 10, 1).toString();
        case "lap 1 current gear":
            return `${randomInt(1, 2)}–${randomInt(1, 11)}`;
        case "avg. power (w)":
            return randomInt(100, 230).toString();
        case "normalized power (w)":
            return randomInt(100, 230).toString();
        case "avg. heart rate (bpm)":
            return randomInt(100, 180).toString();
        case "avg. cadence (rpm)":
            return randomInt(100, 110).toString();
        case "avg. speed (kph)":
            return randomFloat(15, 45, 1).toString();
        case "if®":
            return randomFloat(0, 1.5).toString();
        case "tss®":
            return randomFloat(0, 100).toString();
        case "time in zone 1":
            return formatDuration(randomInt(2, 10));
        case "time in zone 2":
            return formatDuration(randomInt(2, 10));
        case "time in zone 3":
            return formatDuration(randomInt(2, 10));
        case "time in zone 4":
            return formatDuration(randomInt(2, 10));
        case "time in zone 5":
            return formatDuration(randomInt(2, 10));
        case "calorie/hr (cal/hr)":
            return randomInt(200, 400).toString();
        case "time of day":
            return `${randomInt(0, 23)}:${randomInt(0, 59)}`;
        default:
            return "000";
    }
}



// Helper functions for generating realistic random values
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 1): number {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

function formatDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) {
        return `${hrs}:${mins < 10 ? '0' : ''}${mins}:00`;
    } else {
        return `${mins}:00`;
    }
}