# -*- coding: UTF-8 -*-
import os
import sys
import cv2
import datetime

from PyQt5 import QtCore,QtGui,QtWidgets


class Ui_MainWindow(QtWidgets.QWidget):
    def __init__(self, parent=None):
        super(Ui_MainWindow, self).__init__(parent)
        self.timer_camera = QtCore.QTimer()
        self.cap = cv2.VideoCapture()
        self.CAM_NUM = 0
        self.set_ui()
        self.slot_init()
        self.__flag_work = 0
        self.x =0

    #界面显示
    def set_ui(self):

        self.__layout_main = QtWidgets.QHBoxLayout()
        self.__layout_fun_button = QtWidgets.QVBoxLayout()
        self.__layout_data_show = QtWidgets.QVBoxLayout()

        self.button_open_camera = QtWidgets.QPushButton(u'打开相机')
        self.button_capture = QtWidgets.QPushButton(u'拍照')
        self.button_close = QtWidgets.QPushButton(u'退出')
        self.label_show_captrue = QtWidgets.QLabel()
        self.file_direct_name = QtWidgets.QLabel("目录名称：")
        self.file_name_input = QtWidgets.QLineEdit()


        self.button_open_camera.setMinimumHeight(40)
        self.button_capture.setMinimumHeight(40)
        self.button_close.setMinimumHeight(40)
        self.file_name_input.setMinimumHeight(30)

        # 信息显示
        self.label_show_camera = QtWidgets.QLabel()

        self.label_move = QtWidgets.QLabel()
        self.label_move.setFixedSize(300, 60)

        self.label_show_camera.setFixedSize(680, 520)


        self.__layout_fun_button.addWidget(self.button_open_camera)
        self.__layout_fun_button.addWidget(self.button_capture)
        self.__layout_fun_button.addWidget(self.button_close)
        self.__layout_fun_button.addWidget(self.label_move)
        self.__layout_fun_button.addWidget(self.label_show_captrue)
        self.__layout_fun_button.addWidget(self.file_direct_name)
        self.__layout_fun_button.addWidget(self.file_name_input)

        self.__layout_main.addLayout(self.__layout_fun_button)
        self.__layout_main.addWidget(self.label_show_camera)

        self.setLayout(self.__layout_main)
        self.label_move.raise_()
        self.setWindowTitle(u'调用摄像头拍照')


    #按钮监听
    def slot_init(self):
        self.button_open_camera.clicked.connect(self.button_open_camera_click)
        self.button_capture.clicked.connect(self.button_capture_click)
        self.timer_camera.timeout.connect(self.show_camera)
        self.button_close.clicked.connect(self.close)
        self.file_name_input.textChanged[str].connect(self.onChanged)

    #点击打开摄像头按钮
    def button_open_camera_click(self):
        #检测摄像头是否打开
        if self.timer_camera.isActive() == False:
            #检测摄像头设备是否正常
            flag = self.cap.open(self.CAM_NUM)
            if flag == False:
                msg = QtWidgets.QMessageBox.warning(self, u"Warning", u"请检测摄像头是否连接正常！", buttons=QtWidgets.QMessageBox.Ok,defaultButton=QtWidgets.QMessageBox.Ok)
            else:
                self.timer_camera.start(30)
                self.button_open_camera.setText(u'关闭相机')
        else:
            self.timer_camera.stop()
            self.cap.release()
            self.label_show_camera.clear()
            self.button_open_camera.setText(u'打开相机')

    #显示摄像头画面
    def show_camera(self):
        flag, self.image = self.cap.read()
        show = cv2.resize(self.image, (680, 520))
        show = cv2.cvtColor(show, cv2.COLOR_BGR2RGB)
        showImage = QtGui.QImage(show.data, show.shape[1], show.shape[0], QtGui.QImage.Format_RGB888)
        self.label_show_camera.setPixmap(QtGui.QPixmap.fromImage(showImage))

    #点击拍照
    def button_capture_click(self):
        img_name_time = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
        img_name = img_name_time.replace(' ', '_') + ".jpg"
        ret, frame = self.cap.read()

        path = self.file_name_input.text()
        if path == "":
            self.file_direct_name.setText('目录名称不能为空')
            return False

        #创建目录
        isExists = os.path.exists(path)
        if not isExists:
            os.makedirs(path)
            self.file_direct_name.setText(path+"/"+ img_name + ' 保存成功')
        else:
            self.file_direct_name.setText(path + ' 目录已存在')
            return False

        #保存图片 兼容中文目录
        cv2.imencode('.jpg', frame)[1].tofile(path+"/"+img_name)
        #cv2.imwrite(path+"/"+img_name, frame)

        #图片预览
        # cv2.imshow("capture", frame)
        show = cv2.resize(frame, (300, 200))
        show = cv2.cvtColor(show, cv2.COLOR_BGR2RGB)
        showImage = QtGui.QImage(show.data, show.shape[1], show.shape[0], QtGui.QImage.Format_RGB888)
        self.label_show_captrue.setPixmap(QtGui.QPixmap.fromImage(showImage))

    #文本框输入
    def onChanged(self, text):
        self.file_direct_name.setText("目录名称："+text)
        self.file_direct_name.adjustSize()

    #关闭窗口
    def closeEvent(self, event):
        ok = QtWidgets.QPushButton()
        cacel = QtWidgets.QPushButton()

        msg = QtWidgets.QMessageBox(QtWidgets.QMessageBox.Warning, u"关闭提示", u"确认关闭？")

        msg.addButton(ok,QtWidgets.QMessageBox.ActionRole)
        msg.addButton(cacel, QtWidgets.QMessageBox.RejectRole)
        ok.setText(u'确定')
        cacel.setText(u'取消')

        if msg.exec_() == QtWidgets.QMessageBox.RejectRole:
            event.ignore()
        else:
            if self.cap.isOpened():
                self.cap.release()
            if self.timer_camera.isActive():
                self.timer_camera.stop()
            event.accept()

if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)
    ui = Ui_MainWindow()
    ui.show()
    sys.exit(app.exec_())