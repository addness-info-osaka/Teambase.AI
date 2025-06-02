function doPost(e) {
  // CORSヘッダー
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    // デバッグログ - 受信データの詳細確認
    console.log('=== GAS doPost開始 ===');
    console.log('受信イベント全体:', JSON.stringify(e, null, 2));
    console.log('postData:', e.postData);
    console.log('parameter:', e.parameter);
    
    if (e.postData) {
      console.log('postData.contents:', e.postData.contents);
      console.log('postData.type:', e.postData.type);
    }

    // データ取得（複数の方法を試行）
    let data = {};
    
    // 方法1: parameterから取得
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      console.log('方法1: parameterからデータ取得');
      data = e.parameter;
    }
    // 方法2: postData.contentsから取得（JSON）
    else if (e.postData && e.postData.contents) {
      console.log('方法2: postData.contentsからJSON取得');
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('JSON解析エラー:', parseError);
        console.log('Raw contents:', e.postData.contents);
      }
    }
    // 方法3: URLエンコードされたデータ
    else if (e.postData && e.postData.type === 'application/x-www-form-urlencoded') {
      console.log('方法3: URLエンコードデータ処理');
      // URLエンコードされたデータをパース
      const params = new URLSearchParams(e.postData.contents);
      data = {};
      for (const [key, value] of params) {
        data[key] = value;
      }
    }

    console.log('最終取得データ:', data);

    // データの存在確認
    if (!data || Object.keys(data).length === 0) {
      throw new Error('データが送信されていません。受信データ: ' + JSON.stringify(e, null, 2));
    }

    // 必要フィールドの確認
    const requiredFields = ['name', 'company', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error('必須フィールドが不足しています: ' + missingFields.join(', '));
    }

    // スプレッドシート取得
    console.log('スプレッドシート取得開始');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    console.log('シート名:', sheet.getName());

    // データを配列に格納
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.company || ''
    ];

    console.log('保存データ:', rowData);

    // スプレッドシートに追加
    sheet.appendRow(rowData);
    console.log('データ保存完了');

    // 成功レスポンス
    const successResponse = {
      'result': 'success',
      'message': 'データが正常に保存されました。',
      'timestamp': timestamp.toString(),
      'data': data
    };

    console.log('成功レスポンス:', successResponse);

    return ContentService.createTextOutput(JSON.stringify(successResponse))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);

  } catch (error) {
    console.error('=== エラー発生 ===');
    console.error('エラー詳細:', error);
    console.error('スタックトレース:', error.stack);
    
    const errorResponse = {
      'result': 'error',
      'message': error.toString(),
      'timestamp': new Date().toString(),
      'receivedData': e
    };

    return ContentService.createTextOutput(JSON.stringify(errorResponse))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// GETリクエスト対応（任意）
function doGet(e) {
  return ContentService.createTextOutput('このエンドポイントはPOSTリクエストのみを受け付けます。');
}

// OPTIONSリクエスト対応（CORSプリフライト用）
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
} 