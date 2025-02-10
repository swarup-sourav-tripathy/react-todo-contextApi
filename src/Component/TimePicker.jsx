import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from 'react';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/components/theme-provider';
import { createTheme } from '@mui/material/styles';

export default function ResponsiveTimePickers() {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState(null);

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  if (!resolvedTheme) {
    return null; // or a loading spinner
  }

  let clockTheme;
  if (theme === 'dark') {
    clockTheme = createTheme({
      palette: {
        mode: 'dark',
        background: {
          paper: '#121212', // Dark mode paper color
        },
      },
    });
  } else if (theme === 'system') {
    clockTheme = createTheme({
      palette: {
        mode: resolvedTheme,
        background: {
          paper: resolvedTheme === 'dark' ? '#121212' : '#ffffff', // Dynamic paper color
        },
      },
    });
  } else {
    clockTheme = createTheme({
      palette: {
        mode: 'light',
        background: {
          paper: '#ffffff', // Light mode paper color
        },
      },
    });
  }

  console.log('Clock Theme:', clockTheme); // Debugging

  return (
    <ThemeProvider theme={clockTheme}>
      <CssBaseline /> {/* Moved here */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'TimePicker',
            'MobileTimePicker',
            'DesktopTimePicker',
            'StaticTimePicker',
          ]}
        >
          <DemoItem>
            <StaticTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}