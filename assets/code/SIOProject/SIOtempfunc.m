function [below_15_months, rating] = SIOtempfunc(cdip)
%UNTITLED3 Summary of this function goes here
%   Detailed explanation goes here
airtemp = ncread(cdip, 'sstSeaSurfaceTemperature'); % Temperature data
airtime = double(ncread(cdip, 'sstTime'));   % Time data (in seconds since 1970)

% Convert seconds to normal time
new_airtime = (airtime / 86400) + datetime(1970, 1, 1); % get it in normal time instead of seconds from 1970

% the time limits i set
start_date = datetime(2022, 1, 1);
end_date = datetime(2023, 12, 31);

% Truncate  time
valid_indices = (new_airtime >= start_date) & (new_airtime <= end_date);

% truncate wave height and time data
new_airtime = new_airtime(valid_indices);
airtemp = airtemp(valid_indices);
% Group data into days
daily_times = dateshift(new_airtime, 'start', 'day'); % compress all the data into groups of days 
unique_days = unique(daily_times); % Get unique days

% Find the minimum temperature 
daily_min_temp = NaN(size(unique_days)); % Initialize array for daily minimum temperatures
for i = 1:length(unique_days)
    % Find indices for the day 
    day_indices = (daily_times == unique_days(i));
    
    % Get the minimum temperature for the day
    daily_min_temp(i) = min(airtemp(day_indices));
end

% get the  below 15°C days 59F 50-60F (10-15C)  Very Dangerous / Immediately Life-threatening, National Center for Cold Water Safety
below_15_days = unique_days(daily_min_temp < 15); 

% % for the histogram counts
 below_15_months = month(below_15_days);
 rating = round(5-5*(length(below_15_days)/length(unique_days)),1); %I get the percentage in a 1-5 rating where the higher percentage of the cold days gives lower rating
end