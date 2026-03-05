
clear
close all
clc
%load in CDIP variables

%% 
cd C:\Users\smela\Desktop

%% Scripps 
%cdip='201p1_historic.nc';
figure(1);
subplot(2,1,1)
[scrptemp,scrptemrate] = SIOtempfunc('201p1_historic.nc'); %grab temp an rating
histogram( scrptemp);  %histogram
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); % get it in months months
title( [num2str(scrptemrate) ' scrp cold water days jan 2022 to dec 2023']);
grid on;

%figure(2)
subplot(2,1,2)
[scrpwave,scrpwavrate] = SIOwavefunc('201p1_historic.nc');
histogram(scrpwave)
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); % Label months
title([num2str(scrpwavrate) ' scrp high wave days jan 2022 to dec 2023']);
grid on;

totrate = num2str((scrpwavrate +scrptemrate)/2); %average two rating to get a final rating
sgtitle(['Scripps rating: ' totrate])

%% Santa Cruz Basin, CA
cdip='203p1_historic.nc';
figure(2);
subplot(2,1,1)
[santemp,santemprate] = SIOtempfunc('203p1_historic.nc');
histogram( santemp); 
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); % months
title([num2str(santemprate) ' Santa Cruz Basin cold water days jan 2022 to dec 2023']);
grid on;

%figure(4)
subplot(2,1,2)
[sanpwave, sanwavrate] = SIOwavefunc('203p1_historic.nc');
histogram(sanpwave)
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); %  months
title([num2str(sanwavrate) ' Santa Cruz Basin high wave days jan 2022 to dec 2023']);
grid on;

totrate = num2str((sanwavrate + santemprate)/2); %average two rating to get a final rating
sgtitle(['Santa Cruz Basin rating: ' totrate])
%% long beach
%cdip='215p1_historic.nc';
figure(3);
subplot(2,1,1)
[lontemp,lontemrate] = SIOtempfunc('215p1_historic.nc');
histogram( lontemp); 
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); %  months
title([num2str(lontemrate) ' long beach cold water days jan 2022 to dec 2023']);
grid on;

subplot(2,1,2)
[lonpwave,lonwrate] = SIOwavefunc('215p1_historic.nc');
histogram(lonpwave)
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); %  months
title([num2str(lonwrate) ' long beach high wave days jan 2022 to dec 2023']);
grid on;

totrate = num2str((lonwrate +lontemrate)/2); %average two rating to get a final rating
sgtitle(['Long Beach rating: ' totrate])

%% Humboldt Bay North Spit
%cdip='168p1_historic.nc';

figure(4);
subplot(2,1,1)
[humtemp,humtemrate] = SIOtempfunc('168p1_historic.nc');
histogram( humtemp); 
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); %  months
title([num2str(humtemrate) ' Humboldt Bay cold water days jan 2022 to dec 2023']);
grid on;

subplot(2,1,2)
[humwave,humwavrate] = SIOwavefunc('168p1_historic.nc');
histogram(humwave)
xlabel('Month');
ylabel('Num Days');
ylim([0 63])
xticks(1:12);
xticklabels({'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}); %get it in months
title([num2str(humwavrate) ' ' 'Humboldt Bay high wave days jan 2022 to dec 2023']);
grid on;

totrate = num2str((humwavrate +humtemrate)/2); %average two rating to get a final rating
sgtitle(['Humboldt Bay North rating: ' totrate])



