function [above_threshold_months,rating] = SIOwavefunc(cdip)
%UNTITLED5 Summary of this function goes here
%   Detailed explanation goes here
%% load the wave height and time data
% Load wave height and time data
waveheight = ncread(cdip, 'waveHs'); % Wave height data
wavetime = double(ncread(cdip, 'waveTime')); % Time data (in seconds since 1970)

%  Convert seconds to normal time
new_wavetime = (wavetime / 86400) + datetime(1970, 1, 1); % Convert to normal time

% the time limits i set
start_date = datetime(2022, 1, 1); % the two year period was selected so anomolous temp or wave months would get averaged out
end_date = datetime(2023, 12, 31);

% for truncate time index
valid_indices = (new_wavetime >= start_date) & (new_wavetime <= end_date);

% now truncate using the index
filtered_wavetime = new_wavetime(valid_indices);
filtered_waveheight = waveheight(valid_indices);

% get the data into just days
daily_times = dateshift(filtered_wavetime, 'start', 'day'); % Compress data into groups of days
unique_days = unique(daily_times); % Get unique days 

% Find the maximum wave height
daily_max_waveheight = NaN(size(unique_days)); % Initialize 
for i = 1:length(unique_days)
   
    day_indices = (daily_times == unique_days(i));
    
    
    daily_max_waveheight(i) = max(filtered_waveheight(day_indices));
end

% threshold for wave height
threshold = 2;

% get the days
above_threshold_days = unique_days(daily_max_waveheight > threshold);

% for the histogram counts
above_threshold_months = month(above_threshold_days);
rating = round(5-5*(length(above_threshold_days)/length(unique_days)),1); %I get the percentage in a 1-5 rating where the higher percentage of the high wave gives lower rating

end