clear all; % This clears all workspaces
close all; % This closes all figures
clc; % This clears the command window
format long;
%% 'D is 20% larger than d, the fillet radius is 10% of d'

%% MATERIAL copy paste a material from here including the " "
SELECTMat= ["1006 HR";"1006 CD";"1010 HR";"1010 CD";"1015 HR";"1015 CD"; "1018 HR"; "1018 CD"; "1020 HR"; "1020 CD"; "1030 HR"; "1030 CD";"1035 HR"; "1035 CD"; "1040 HR"; "1040 CD"; "1045 HR"; "1045 CD"; "1050 HR"; "1050 CD"];

%material Finish                        
selectFIN = ["ground";"Machined or cold-drawn";"Hot-rolled";"As-forged"];
%Finishsel = "Machined or cold-drawn";

% RELIABILITY FACTOR
selectREL = ["50";"90";"95";"99";"99.9";"99.99";"99.999";"99.9999"];
%Reliablitysel = "99.99";
%% UI
disp(transpose(SELECTMat))
mat_prompt = "select material copy paste things in the apostropy DO NOT INCLUDE THE "" ";
Matialsel = input(mat_prompt,"s");

n = str2double( input("input fator of safety  ","s") );
Ta=str2double( input("input torque alternating in lbin ","s") );
Tm=str2double( input("input torque mean in lbin ","s") );
Mm= str2double( input("input Moment Mean in lbin ","s") );
Ma = str2double( input("input  Moment alternating in lbin ","s") );

d = str2double( input("input initial guess of diameter in inches  ","s") );

disp(transpose(selectFIN))
fin_prompt = "select Material Finish !!copy paste things in the apostropy!! DO NOT INCLUDE THE "" ";
Finishsel = input(fin_prompt,"s");

disp(transpose(selectREL))
REL_prompt = "select RELIABILITY FACTOR copy paste things in the apostropy DO NOT INCLUDE THE "" ";
Reliablitysel = input(REL_prompt,"s");



%% Table A 20 materials
Num = [1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20];
material = ["1006 HR";"1006 CD";"1010 HR";"1010 CD";"1015 HR";"1015 CD"; "1018 HR"; "1018 CD"; "1020 HR"; "1020 CD"; "1030 HR"; "1030 CD"; ...
    "1035 HR"; "1035 CD"; "1040 HR"; "1040 CD"; "1045 HR"; "1045 CD"; "1050 HR"; "1050 CD"];
Tensile = [43;48;47;53;50;56;58;64;55;68;68;76;72;80;76;85;82;91;90;100];
yield = [24;41;26;44;27.5;47;32;54;30;57;37.5;64;39.5;67;42;71;45;77;49.5;84]; 

T = table(Num,material,Tensile,yield);
v = find(material == Matialsel); % INPUT MATERIAL NAME HERE YOU  NEED TO COPY PASTE THE MATERIAL NAME EXACT
for I = v
    Sut = T.Tensile(I);
    Sy = T.yield(I);
end

Seprm = Sut / 2;


%% Marin factors and Se
%ka
NUMBER = [1;2;3;4];
FINISH = ["ground";"Machined or cold-drawn";"Hot-rolled";"As-forged"];
avar = [1.34; 2.70 ;14.4 ;39.9 ];
bvar = [  -.085; -.265; -.718; -.995];
Marin = table(FINISH,avar,bvar);
q = find(FINISH == Finishsel);                              
for Z = q
    A = Marin.avar(Z);
    B = Marin.bvar(Z);
end
ka = A*(Sut)^B;
%kb
%dnew = 1.2;
delta = 1;
Kt = 1.6;
Kts = 1.37;

rta= .246 - 3.08*(10^-3)*(Sut) +1.51*(10^-5)*( (Sut)^2)-2.67*(10^-8)*((Sut)^3); %root a bending
rtas = .190 - 2.51*(10^-3)*(Sut) +1.35*(10^-5)*((Sut)^2)-2.67*(10^-8)*((Sut)^3); %root a sheer
while delta >.0001 %abs( (dnew-d)/d) > .01
   dold=d;


if  d >= .3 && d <= 2
    kb = .879*d^(-.107);
elseif d > 2 && d<10
    kb = .91*d^(-.157);
else
    kb = 1;
end

%% Ke
Numb = [1;2;3;4;5;6;7;8];
Reliabity = ["50";"90";"95";"99";"99.9";"99.99";"99.999";"99.9999"];
Reliabilty_fac = [1;.897;.868;.814;.753;.702; 0.659;0.620];
reliableKE = table(Numb,Reliabity,Reliabilty_fac);
o = find(Reliabity == Reliablitysel);
for O = o
    ke = reliableKE.Reliabilty_fac(O);
end
%ke = .702; %assume 99.99 reliability
%% Se
Se = Seprm * ke* ka *kb;

%% Kt Kts and Kf Kfs
r = .1*d;


Kf = 1 + (Kt - 1)/(1+ rta/(sqrt(r)));
Kfs = 1 + (Kts - 1)/(1+ rtas/(sqrt(r)));

%% De Goodman

d =  ( (16*n/pi)*( (1/(Se*10^3)) *(4*(Kf*Ma)^2 + 3*(Kfs*Ta)^2)^(.5)  +  (1/(Sut*10^3))*(4*(Kf*Mm)^2 + 3*(Kfs*Tm)^2 )^(.5) ) )^(1/3);
delta = abs( (d-dold)/dold );
%MOOO = Se

end

siga =    (((32*Kf*Ma)/(pi*d^3)) ^2  + 3*((16*Kfs*Ta)/(pi*d^3)))^(.5);
sigm = (((32*Kf*Mm)/(pi*d^3)) ^2  + 3*((16*Kfs*Tm)/(pi*d^3)))^(.5);

ny = (Sy*10^3) /( sigm +siga);

if ny>n
    disp('No yielding, diameter is')
    disp(d)
else
    disp('WARNING yielding')
end



