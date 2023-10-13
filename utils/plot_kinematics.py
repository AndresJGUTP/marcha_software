# conda install -c conda-forge ezc3d

import c3d
import numpy as np
from io import BytesIO
import base64
import pandas as pd

import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('agg')

ANGLES_TO_PLOT = [
    ('LHipAngles', 'RHipAngles'),
    ('LPelvisAngles', 'RPelvisAngles',),
    ('LKneeAngles', 'RKneeAngles'),
    ('LAnkleAngles', 'RAnkleAngles'),
    ('LFootProgressAngles', 'RFootProgressAngles'),
]

MEASURES_TO_PLOT = [
        ('Fx1', 'Fy1', 'Fz1'),
        ('Mx1', 'My1', 'Mz1'),
        ('Fx2', 'Fy2', 'Fz2'),
        ('Mx2', 'My2', 'Mz2'),
    ]

def plot_kinematics(data_path, return_base64=False):

    with open(data_path, 'rb') as handle:
        reader = c3d.Reader(handle)
        point_labels = [label.strip() for label in reader.point_labels]
        data = list(reader.read_frames())

        point_data = np.array([tuple_frame[1] for tuple_frame in data])
        point_data = np.transpose(point_data, (2, 1, 0))

    fig, axs = plt.subplots(5, 3, figsize=(10, 10))

    if ANGLES_TO_PLOT[0][0] not in point_labels:
         return None

    for row, (l_angle_plot, r_angle_plot) in enumerate(ANGLES_TO_PLOT):
            X_l, Y_l, Z_l, _, _ = point_data[:, point_labels.index(l_angle_plot), :]
            X_r, Y_r, Z_r, _, _ = point_data[:, point_labels.index(r_angle_plot), :]

            title = l_angle_plot[1:]

            axs[row, 0].plot(X_l, 'r')
            axs[row, 0].plot(X_r, 'g')

            axs[row, 0].set_title(f'{title} X')
            axs[row, 0].fill_between(
                    x= range(len(X_l)), 
                    y1= X_l+X_l*0.5, 
                    y2= X_l-X_l*0.5,
                    color= "gray",
                    alpha= 0.2)
            
            axs[row, 1].plot(Y_l, 'r')
            axs[row, 1].plot(Y_r, 'g')

            axs[row, 1].set_title(f'{title} Y')
            axs[row, 1].fill_between(
                    x= range(len(Y_l)), 
                    y1= Y_l+Y_l*0.5, 
                    y2= Y_l-Y_l*0.5,
                    color= "gray",
                    alpha= 0.2)
            

            axs[row, 2].plot(Z_l, 'r')
            axs[row, 2].plot(Z_r, 'g')

            axs[row, 2].set_title(f'{title} Z')
            axs[row, 2].fill_between(
                    x= range(len(Z_l)), 
                    y1= Z_l+Z_l*0.5, 
                    y2= Z_l-Z_l*0.5,
                    color= "gray",
                    alpha= 0.2)



    plt.tight_layout()

    if return_base64:
        buffer = BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()

        graphic = base64.b64encode(image_png)
        graphic = graphic.decode('utf-8')

        return graphic
    else:
         return fig

def plot_eeg(data_path, return_base64=False):

    df = pd.read_csv(data_path)

    fig, axs = plt.subplots(4, 1, figsize=(8, 8))

    axs[0].plot(df['Channel1'])
    axs[0].set_title('Canal #1')
    axs[0].grid('on')

    axs[1].plot(df['Channel2'])
    axs[1].set_title('Canal #2')
    axs[1].grid('on')

    axs[2].plot(df['Channel3'])
    axs[2].set_title('Canal #3')
    axs[2].grid('on')

    axs[3].plot(df['Channel4'])
    axs[3].set_title('Canal #4')
    axs[3].grid('on')

    plt.tight_layout()

    if return_base64:
        buffer = BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()

        graphic = base64.b64encode(image_png)
        graphic = graphic.decode('utf-8')

        return graphic
    else:
         return fig
    
def plot_force_plate(data_path, return_base64=False):
     
    with open(data_path, 'rb') as handle:
        reader = c3d.Reader(handle)

        if reader.analog_per_frame == 0:
             return None
        
        analog_labels = [label.strip() for label in reader.analog_labels]
        data = list(reader.read_frames())

        analog_data = np.array([tuple_frame[2] for tuple_frame in data])
        analog_data = np.transpose(analog_data, (2, 1, 0))
     
    fig, axs = plt.subplots(4, 3, figsize=(10, 10))

    for row, (x_measure, y_measure, z_measure) in enumerate(MEASURES_TO_PLOT):

        try:
                X = np.abs(analog_data[:, analog_labels.index(x_measure), :][0])
                Y = np.abs(analog_data[:, analog_labels.index(y_measure), :][0])
                Z = np.abs(analog_data[:, analog_labels.index(z_measure), :][0])
        except:
                print(f'No existe: {x_measure}, {y_measure}, {z_measure}')
                continue

        axs[row, 0].plot(X, 'r')
        axs[row, 0].set_title(f'{x_measure}')
        axs[row, 0].fill_between(
                x= range(len(X)), 
                y1= X+X*0.5, 
                y2= X-X*0.5,
                color= "gray",
                alpha= 0.2)
        
        axs[row, 1].plot(Y, 'b')
        axs[row, 1].set_title(f'{y_measure}')
        axs[row, 1].fill_between(
                x= range(len(Y)), 
                y1= Y+Y*0.5, 
                y2= Y-Y*0.5,
                color= "gray",
                alpha= 0.2)
                
        axs[row, 2].plot(Z, 'g')
        axs[row, 2].set_title(f'{z_measure}')
        axs[row, 2].fill_between(
                x= range(len(Z)), 
                y1= Z+Z*0.5, 
                y2= Z-Z*0.5,
                color= "gray",
                alpha= 0.2)
        
    plt.tight_layout()

    if return_base64:
        buffer = BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()

        graphic = base64.b64encode(image_png)
        graphic = graphic.decode('utf-8')

        return graphic
    else:
         return fig